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
include 'db.php';

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

// Extract and sanitize input
$username = mysqli_real_escape_string($conn, $data['username']);
$password = $data['password']; // Password will be checked against the hashed password

// Check if the username exists
$query = "SELECT memberID, password FROM members WHERE username = '$username'";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    // Email exists, now verify the password
    $user = mysqli_fetch_assoc($result);
    
    // Check if the provided password matches the stored hashed password
    if (password_verify($password, $user['password'])) {
        // Password is correct, return success and memberID
        echo json_encode(["message" => "Login successful", "memberID" => $user['memberID']]);
    } else {
        // Incorrect password
        echo json_encode(["message" => "Incorrect password"]);
    }
} else {
    // Email doesn't exist
    echo json_encode(["message" => "Email not found"]);
}

// Close the database connection
mysqli_close($conn);
?>
