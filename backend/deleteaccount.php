<?php
header('Content-Type: application/json'); // Set response type to JSON

// Include your database connection
include 'db.php';

// Get the memberID from the request (assuming it's sent as a GET parameter)
$memberID = isset($_GET['memberID']) ? intval($_GET['memberID']) : 0;

// Check if the memberID is valid
if ($memberID <= 0) {
    echo json_encode(["message" => "Invalid memberID"]);
    exit();
}

// Prepare the delete query
$sql = "DELETE FROM members WHERE memberID = $memberID";

// Execute the query
if (mysqli_query($conn, $sql)) {
    echo json_encode(["message" => "Member deleted successfully"]);
} else {
    echo json_encode(["message" => "Error deleting member: " . mysqli_error($conn)]);
}

// Close the database connection
mysqli_close($conn);
?>
