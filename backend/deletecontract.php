<?php
header('Content-Type: application/json'); // Set response type to JSON

// Include your database connection
include 'db.php'; // Ensure db.php contains the database connection

// Get the contractID from the GET or POST data
// In this example, we use GET for simplicity. You can also use POST depending on your needs.
$contractID = intval($_GET['contractID']); // Get the contractID from the URL parameter

// Validate that the contractID is valid
if ($contractID <= 0) {
    echo json_encode(["message" => "Invalid contractID"]);
    exit();
}

// Delete the contract from the database
$sql = "DELETE FROM contracts WHERE contractID = $contractID";

// Execute the query
if (mysqli_query($conn, $sql)) {
    // Check if any rows were affected (this means a contract was deleted)
    if (mysqli_affected_rows($conn) > 0) {
        echo json_encode(["message" => "Contract deleted successfully"]);
    } else {
        echo json_encode(["message" => "No contract found with the given contractID"]);
    }
} else {
    echo json_encode(["message" => "Error deleting contract: " . mysqli_error($conn)]);
}

// Close the database connection
mysqli_close($conn);
?>
