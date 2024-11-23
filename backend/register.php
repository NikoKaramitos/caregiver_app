<?php
header('Content-Type: application/json'); // Set response type to JSON // UPDATE

// Include your database connection
include 'db.php'; // UPDATE

// Get POST data
$data = json_decode(file_get_contents("php://input"), true); // UPDATE

// Extract and sanitize input
$name = mysqli_real_escape_string($conn, $data['name']);
$phone = mysqli_real_escape_string($conn, $data['phone']);
$address = mysqli_real_escape_string($conn, $data['address']);
$password = password_hash($data['password'], PASSWORD_BCRYPT); // Hash the password // UPDATE
$hoursAvailable = intval($data['hoursAvailable']);
$maxTime = intval($data['maxTime']);

// Check if phone already exists
$checkQuery = "SELECT phone FROM members WHERE phone = '$phone'";
$checkResult = mysqli_query($conn, $checkQuery);

if (mysqli_num_rows($checkResult) > 0) {
    // Phone number already exists
    echo json_encode(["message" => "Phone number already exists"]);
    mysqli_close($conn);
    exit();
}

// Insert into the database
$sql = "INSERT INTO members (name, phone, address, password, hoursAvailable, maxTime, rating, careDollars) 
        VALUES ('$name', '$phone', '$address', '$password', $hoursAvailable, $maxTime, 0, 2000)";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["message" => "Registration successful", "memberID" => $memberID]);
} else {
    echo json_encode(["message" => "Error: " . mysqli_error($conn)]);
}

// Close the database connection
mysqli_close($conn);
?>