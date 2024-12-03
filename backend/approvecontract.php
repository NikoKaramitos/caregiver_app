<?php
header('Content-Type: application/json'); // Set response type to JSON

// Include your database connection
include 'db.php'; // Ensure db.php contains the database connection

// Get the contractID from the GET data
$contractID = intval($_GET['contractID']); // Get the contractID from the URL parameter

// Validate that the contractID is valid
if ($contractID <= 0) {
    echo json_encode(["message" => "Invalid contractID"]);
    exit();
}

// Start a transaction to ensure data consistency
mysqli_begin_transaction($conn);

try {
    // Fetch caregiverID, recipientParentID, weeklyHrs, startDate, and endDate from the contracts table
    $contractQuery = "SELECT caregiverID, recipientParentID, weeklyHrs, startDate, endDate FROM contracts WHERE contractID = $contractID";
    $contractResult = mysqli_query($conn, $contractQuery);
    
    if (mysqli_num_rows($contractResult) == 0) {
        echo json_encode(["message" => "No contract found with the given contractID"]);
        exit();
    }
    
    $contract = mysqli_fetch_assoc($contractResult);
    $caregiverID = $contract['caregiverID'];
    $recipientParentID = $contract['recipientParentID'];
    $weeklyHrs = $contract['weeklyHrs'];
    $startDate = $contract['startDate'];
    $endDate = $contract['endDate'];

    // Calculate the number of weeks the contract lasts
    $startDateTime = new DateTime($startDate); // Start date as DateTime object
    $endDateTime = new DateTime($endDate);     // End date as DateTime object
    $interval = $startDateTime->diff($endDateTime); // Calculate the difference
    $days = $interval->days; // Total days of the contract
    $weeks = ceil($days / 7); // Convert days to weeks and apply ceiling

    // Fetch memberID of the recipient from the parent table
    $parentQuery = "SELECT memberID FROM parent WHERE parentID = $recipientParentID";
    $parentResult = mysqli_query($conn, $parentQuery);
    if (mysqli_num_rows($parentResult) == 0) {
        echo json_encode(["message" => "No recipient found with the given recipientParentID"]);
        exit();
    }
    
    $parent = mysqli_fetch_assoc($parentResult);
    $recipientMemberID = $parent['memberID'];

    // Fetch timeAvailable and careDollars for both caregiver and recipient
    $membersQuery = "SELECT timeAvailable, careDollars FROM members WHERE memberID IN ($caregiverID, $recipientMemberID)";
    $membersResult = mysqli_query($conn, $membersQuery);
    if (mysqli_num_rows($membersResult) < 2) {
        echo json_encode(["message" => "One or both members not found in the members table"]);
        exit();
    }

    $members = [];
    while ($member = mysqli_fetch_assoc($membersResult)) {
        $members[] = $member;
    }

    $caregiver = $members[0]; // Assume the first record is for the caregiver
    $recipient = $members[1]; // The second record is for the recipient

    $caregiverTimeAvailable = $caregiver['timeAvailable'];
    $recipientCareDollars = $recipient['careDollars'];

    // Calculate the money to subtract from the recipient's careDollars
    $moneyToSubtract = $weeks * $weeklyHrs * 30;

    if ($recipientCareDollars < $moneyToSubtract) {
        echo json_encode(["message" => "Not enough careDollars for the recipient"]);
        exit();
    }

    // Update caregiver's timeAvailable and recipient's careDollars
    $newCaregiverTimeAvailable = $caregiverTimeAvailable - $weeklyHrs;
    $newRecipientCareDollars = $recipientCareDollars - $moneyToSubtract;

    if ($newCaregiverTimeAvailable < 0) {
        echo json_encode(["message" => "Not enough time available for the caregiver"]);
        exit();
    }

    // Update records in the members table
    $updateCaregiverQuery = "UPDATE members SET timeAvailable = $newCaregiverTimeAvailable WHERE memberID = $caregiverID";
    $updateRecipientQuery = "UPDATE members SET careDollars = $newRecipientCareDollars WHERE memberID = $recipientMemberID";

    if (!mysqli_query($conn, $updateCaregiverQuery) || !mysqli_query($conn, $updateRecipientQuery)) {
        throw new Exception("Error updating members table: " . mysqli_error($conn));
    }

    // Now update the contract's approval status
    $updateContractQuery = "UPDATE contracts SET approved = 1 WHERE contractID = $contractID";
    if (!mysqli_query($conn, $updateContractQuery)) {
        throw new Exception("Error updating contract status: " . mysqli_error($conn));
    }

    // Commit the transaction
    mysqli_commit($conn);
    echo json_encode(["message" => "Contract approved successfully, and member data updated"]);

} catch (Exception $e) {
    // Rollback the transaction if an error occurs
    mysqli_rollback($conn);
    echo json_encode(["message" => "Error: " . $e->getMessage()]);
}

// Close the database connection
mysqli_close($conn);
?>
