<?php
header('Content-Type: application/json'); // Set response type to JSON

// Include your database connection
include 'db.php'; // Ensure db.php contains the database connection

// Get the input data (either memberID or email)
$memberID = isset($_GET['memberID']) ? intval($_GET['memberID']) : null;
$email = isset($_GET['email']) ? $_GET['email'] : null;

// Validate the input: either memberID or email must be provided
if (!$memberID && !$email) {
    echo json_encode(["message" => "You must provide either memberID or email"]);
    exit();
}

// Build the query based on whether memberID or email is provided
if ($memberID) {
    // Query by memberID
    $sql = "SELECT username, name, phone, email, address, hoursAvailable, maxTime, lastTenRatings FROM members WHERE memberID = $memberID";
} elseif ($email) {
    // Query by email
    $sql = "SELECT username, name, phone, email, address, hoursAvailable, maxTime, lastTenRatings FROM members WHERE email = '$email'";
}

// Execute the query
$result = mysqli_query($conn, $sql);

// Check if a record was found
if (mysqli_num_rows($result) > 0) {
    // Fetch the member data
    $member = mysqli_fetch_assoc($result);
    
    // Return the member information in JSON format
    echo json_encode([
        "message" => "Member found",
        "memberID" => $memberID ? $memberID : null,
        "name" => $member['name'],
        "phone" => $member['phone'],
        "address" => $member['address'],
        "hoursAvailable" => $member['hoursAvailable'],
        "maxTime" => $member['maxTime'],
        "email" => $member['email'],
        "lastTenRatings" => $member['lastTenRatings']
    ]);
} else {
    // No matching member found
    echo json_encode(["message" => "No member found with the given memberID or email"]);
}

// Close the database connection
mysqli_close($conn);
?>
