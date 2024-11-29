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
include 'db.php'; // Ensure db.php contains the database connection

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

// Extract and sanitize input
$username = mysqli_real_escape_string($conn, $data['username']);
$name = mysqli_real_escape_string($conn, $data['name']);
$phone = mysqli_real_escape_string($conn, $data['phone']);
$address = mysqli_real_escape_string($conn, $data['address']);
$password = password_hash($data['password'], PASSWORD_BCRYPT); // Hash the password
$timeAvailable = intval($data['timeAvailable']);

// Initialize ratings as a 10-character string of zeros
$lastTenRatings = '0000000000';

// Check if the email already exists (make sure you handle this check before inserting)
$email = mysqli_real_escape_string($conn, $data['email']);
$checkQuery = "SELECT email FROM members WHERE email = '$email'";
$checkResult = mysqli_query($conn, $checkQuery);

if (mysqli_num_rows($checkResult) > 0) {
    // Email already exists
    echo json_encode(["message" => "Email already exists"]);
    mysqli_close($conn);
    exit();
}

// Insert into the database
$sql = "INSERT INTO members (username, password, name, email, phone, address, timeAvailable, lastTenRatings)
        VALUES ('$username', '$password', '$name', '$email', '$phone', '$address', $timeAvailable, '$lastTenRatings')";

// Execute the query
if (mysqli_query($conn, $sql)) {
    // Retrieve the newly inserted member's ID
    $memberID = mysqli_insert_id($conn);
    echo json_encode(["message" => "Registration successful", "memberID" => $memberID]);
} else {
    // If there's an error, output it
    echo json_encode(["message" => "Error: " . mysqli_error($conn)]);
}

// Close the database connection
mysqli_close($conn);
?>
