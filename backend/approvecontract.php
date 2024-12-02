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
    $startDate = $contract['startDate']; // Days since epoch
    $endDate = $contract['endDate'];     // Days since epoch

    // Calculate the number of weeks the contract lasts
    $weeks = ceil(($endDate - $startDate) / 7);

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
    $membersQuery = "SELECT memberID, timeAvailable, careDollars FROM members WHERE memberID IN ($caregiverID, $recipientMemberID)";
    $membersResult = mysqli_query($conn, $membersQuery);
    if (mysqli_num_rows($membersResult) < 2) {
        echo json_encode(["message" => "One or both members not found in the members table"]);
        exit();
    }

    // Assign caregiver and recipient data
    while ($member = mysqli_fetch_assoc($membersResult)) {
        if ($member['memberID'] == $caregiverID) {
            $caregiver = $member;
        } else {
            $recipient = $member;
        }
    }

    $caregiverTimeAvailable = $caregiver['timeAvailable'];
    $caregiverCareDollars = $caregiver['careDollars'];
    $recipientCareDollars = $recipient['careDollars'];

    // Calculate the careDollars spent
    $careDollarsSpent = $weeks * $weeklyHrs * 30;

    if ($recipientCareDollars < $careDollarsSpent) {
        echo json_encode(["message" => "Not enough careDollars for the recipient"]);
        exit();
    }

    // Update caregiver's timeAvailable and careDollars of caregiver and recipient
    $newCaregiverTimeAvailable = $caregiverTimeAvailable - $weeklyHrs;
    $newRecipientCareDollars = $recipientCareDollars - $careDollarsSpent;
    $newCaregiverCareDollars = $caregiverCareDollars + $careDollarsSpent;

    if ($newCaregiverTimeAvailable < 0) {
        echo json_encode(["message" => "Not enough time available for the caregiver"]);
        exit();
    }

    // Update records in the members table
    $updateCaregiverQuery = "UPDATE members SET timeAvailable = $newCaregiverTimeAvailable, careDollars = $newCaregiverCareDollars WHERE memberID = $caregiverID";
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
