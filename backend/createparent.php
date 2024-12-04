<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight requests
    http_response_code(204);
    exit();
}

// Include your database connection
include 'db.php';

// Get POST data (Assuming the data is sent as JSON)
$data = json_decode(file_get_contents("php://input"), true);

// Extract and sanitize input
$memberID = intval($data['memberID']); // Assuming memberID is sent with the data
$name = mysqli_real_escape_string($conn, $data['name']);
$phone = mysqli_real_escape_string($conn, $data['phone']);
$address = mysqli_real_escape_string($conn, $data['address']);

// Ensure that memberID exists (you can add your own validation logic)
if ($memberID <= 0) {
    echo json_encode(["message" => "Invalid memberID"]);
    exit();
}

// Insert into the database
$sql = "INSERT INTO parent (memberID, name, phone, address) 
        VALUES ($memberID, '$name', '$phone', '$address')";

// Execute the query
if (mysqli_query($conn, $sql)) {
    // Get the auto-incremented parentID
    $parentID = mysqli_insert_id($conn);
    echo json_encode(["message" => "Parent created successfully", "parentID" => $parentID]);
} else {
    echo json_encode(["message" => "Error creating parent: " . mysqli_error($conn)]);
}

// Close the database connection
mysqli_close($conn);
?>