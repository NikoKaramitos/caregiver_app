<?php
header('Content-Type: application/json'); // Set response type to JSON

// Include your database connection
include 'db.php';

// Get POST data (Assuming the data is sent as JSON)
$data = json_decode(file_get_contents("php://input"), true);

// Extract and sanitize input
$caregiverID = intval($data['caregiverID']); // Ensure caregiverID is valid
$recipientParentID = intval($data['recipientParentID']); // Ensure recipientParentID is valid
$startDate = mysqli_real_escape_string($conn, $data['startDate']);
$endDate = mysqli_real_escape_string($conn, $data['endDate']);
$weeklyHours = intval($data['weeklyHours']); // Ensure weeklyHours is valid
$approved = intval($data['approved']); // Assuming 1 for approved, 0 for not approved

// Ensure that caregiverID and recipientParentID are valid
if ($caregiverID <= 0 || $recipientParentID <= 0) {
    echo json_encode(["message" => "Invalid caregiverID or recipientParentID"]);
    exit();
}

// Insert into the database
$sql = "INSERT INTO contracts (caregiverID, recipientParentID, startDate, endDate, weeklyHours, approved) 
        VALUES ($caregiverID, $recipientParentID, '$startDate', '$endDate', $weeklyHours, $approved)";

// Execute the query
if (mysqli_query($conn, $sql)) {
    // Get the auto-incremented contractID
    $contractID = mysqli_insert_id($conn);
    echo json_encode(["message" => "Contract created successfully", "contractID" => $contractID]);
} else {
    echo json_encode(["message" => "Error creating contract: " . mysqli_error($conn)]);
}

// Close the database connection
mysqli_close($conn);
?>
