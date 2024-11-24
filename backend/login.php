<?php
header('Content-Type: application/json'); // Set response type to JSON

// Include your database connection
include 'db.php';

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

// Extract and sanitize input
$email = mysqli_real_escape_string($conn, $data['email']);
$password = $data['password']; // Password will be checked against the hashed password

// Check if the email exists
$query = "SELECT memberID, password FROM members WHERE email = '$email'";
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
