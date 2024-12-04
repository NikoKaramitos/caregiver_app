<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

header('Content-Type: application/json');

include 'db.php';

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (is_null($data) || !isset($data['contractID'])) {
    http_response_code(400);
    echo json_encode(["message" => "No input data received or invalid JSON"]);
    exit();
}

$contractID = intval($data['contractID']);

if ($contractID <= 0) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid contractID"]);
    exit();
}

mysqli_begin_transaction($conn);

try {
    // Fetch contract details
    $contractQuery = "SELECT caregiverID, recipientParentID, weeklyHours, startDate, endDate, approval FROM contracts WHERE contractID = $contractID FOR UPDATE";
    $contractResult = mysqli_query($conn, $contractQuery);

    if (!$contractResult || mysqli_num_rows($contractResult) == 0) {
        throw new Exception("No contract found with the given contractID");
    }

    $contract = mysqli_fetch_assoc($contractResult);

    if ($contract['approval']) {
        throw new Exception("Contract is already approved");
    }

    $caregiverID = $contract['caregiverID'];
    $recipientParentID = $contract['recipientParentID'];
    $weeklyHours = $contract['weeklyHours'];
    $startDate = $contract['startDate'];
    $endDate = $contract['endDate'];

    // Fetch recipientID from parent table
    $parentQuery = "SELECT memberID FROM parent WHERE parentID = $recipientParentID";
    $parentResult = mysqli_query($conn, $parentQuery);

    if (!$parentResult || mysqli_num_rows($parentResult) == 0) {
        throw new Exception("No parent found with the given recipientParentID");
    }

    $parent = mysqli_fetch_assoc($parentResult);
    $recipientID = $parent['memberID'];

    // Calculate total hours
    $totalWeeks = ceil(($endDate - $startDate) / 7);
    $totalHours = $weeklyHours * $totalWeeks;

    // Fetch caregiver and recipient data
    $membersQuery = "SELECT memberID, timeAvailable, careDollars FROM members WHERE memberID IN ($caregiverID, $recipientID) FOR UPDATE";
    $membersResult = mysqli_query($conn, $membersQuery);

    if (!$membersResult || mysqli_num_rows($membersResult) < 2) {
        throw new Exception("One or both members not found in the members table");
    }

    while ($member = mysqli_fetch_assoc($membersResult)) {
        if ($member['memberID'] == $caregiverID) {
            $caregiver = $member;
        } else {
            $recipient = $member;
        }
    }

    // Calculate careDollars
    $careDollarsSpent = $totalHours * 30;
    if ($recipient['careDollars'] < $careDollarsSpent) {
        throw new Exception("Recipient does not have enough careDollars");
    }

    // Update timeAvailable and careDollars
    $newCaregiverTimeAvailable = $caregiver['timeAvailable'] - $weeklyHours;
    $newCaregiverCareDollars = $caregiver['careDollars'] + $careDollarsSpent;
    $newRecipientCareDollars = $recipient['careDollars'] - $careDollarsSpent;

    if ($newCaregiverTimeAvailable < 0) {
        throw new Exception("Caregiver does not have enough time available");
    }

    $updateCaregiverQuery = "UPDATE members SET timeAvailable = $newCaregiverTimeAvailable, careDollars = $newCaregiverCareDollars WHERE memberID = $caregiverID";
    $updateRecipientQuery = "UPDATE members SET careDollars = $newRecipientCareDollars WHERE memberID = $recipientID";

    if (!mysqli_query($conn, $updateCaregiverQuery) || !mysqli_query($conn, $updateRecipientQuery)) {
        throw new Exception("Error updating members: " . mysqli_error($conn));
    }

    // Update contract approval
    $updateContractQuery = "UPDATE contracts SET approval = 1 WHERE contractID = $contractID";
    if (!mysqli_query($conn, $updateContractQuery)) {
        throw new Exception("Error updating contract: " . mysqli_error($conn));
    }

    mysqli_commit($conn);
    echo json_encode(["message" => "Contract approved successfully."]);

} catch (Exception $e) {
    mysqli_rollback($conn);
    http_response_code(400);
    echo json_encode(["message" => "Error: " . $e->getMessage()]);
}

mysqli_close($conn);
?>
