<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight requests
    http_response_code(204);
    exit();
}

header('Content-Type: application/json'); // Set response type to JSON

// Include your database connection
include 'db.php'; // Ensure db.php contains the database connection

// Get the POST data (assuming data is passed as JSON)
$data = json_decode(file_get_contents("php://input"), true);

// Extract and sanitize input
$memberID = intval($data['memberID']); // Get the memberID
$name = mysqli_real_escape_string($conn, $data['name']);
$phone = mysqli_real_escape_string($conn, $data['phone']);
$email = mysqli_real_escape_string($conn, $data['email']);
$address = mysqli_real_escape_string($conn, $data['address']);
$timeAvailable = intval($data['timeAvailable']);

// Validate that the memberID is valid
if ($memberID <= 0) {
    echo json_encode(["message" => "Invalid memberID"]);
    exit();
}

// Build the update SQL query
$sql = "UPDATE members SET 
            name = '$name', 
            phone = '$phone', 
            email = '$email', 
            address = '$address', 
            timeAvailable = $timeAvailable
        WHERE memberID = $memberID";

// Execute the query
if (mysqli_query($conn, $sql)) {
    // Check if any rows were affected (this means the member was updated)
    if (mysqli_affected_rows($conn) > 0) {
        echo json_encode(["message" => "Member updated successfully"]);
    } else {
        echo json_encode(["message" => "No member found with the given memberID or no changes made"]);
    }
} else {
    // If there’s an error, output it
    echo json_encode(["message" => "Error updating member: " . mysqli_error($conn)]);
}

// Close the database connection
mysqli_close($conn);
?>
