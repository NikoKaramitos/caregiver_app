<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

header('Content-Type: application/json'); // Set response type to JSON

// Include your database connection
include 'db.php';

// Get POST data (Assuming the data is sent as JSON)
$data = json_decode(file_get_contents("php://input"), true);

// Check for the `message` boolean in the input
if (isset($data['message']) && $data['message'] == 1) {
    // Insert contract with only caregiverID, recipientID, and default values
    $caregiverID = intval($data['caregiverID']);
    $recipientID = intval($data['recipientID']);
    
    // Validate caregiverID and recipientID
    if ($caregiverID <= 0 || $recipientID <= 0) {
        echo json_encode(["message" => "Invalid caregiverID or recipientID"]);
        exit();
    }

    // Insert into the contracts table with default values and approval set to 2
    $sql = "INSERT INTO contracts (caregiverID, recipientID, recipientParentID, startDate, endDate, weeklyHours, approval) 
            VALUES ($caregiverID, $recipientID, 0, 0, 0, 0, 2)";
    
    if (mysqli_query($conn, $sql)) {
        // Get the auto-incremented contractID
        $contractID = mysqli_insert_id($conn);
        echo json_encode(["message" => "Contract created successfully with default values", "contractID" => $contractID]);
    } else {
        echo json_encode(["message" => "Error creating contract: " . mysqli_error($conn)]);
    }

    // Close the database connection and exit
    mysqli_close($conn);
    exit();
}

// Extract and sanitize input for the standard case
$caregiverID = intval($data['caregiverID']); // Ensure caregiverID is valid
$username = mysqli_real_escape_string($conn, $data['username']); // Sanitize username
$parentName = mysqli_real_escape_string($conn, $data['parentName']); // Sanitize parent name
$startDate = mysqli_real_escape_string($conn, $data['startDate']);
$endDate = mysqli_real_escape_string($conn, $data['endDate']);
$weeklyHours = intval($data['weeklyHours']); // Ensure weeklyHours is valid

// Ensure caregiverID is valid
if ($caregiverID <= 0) {
    echo json_encode(["message" => "Invalid caregiverID"]);
    exit();
}

// Fetch the memberID of the recipient based on the username and parent name
$memberQuery = "SELECT memberID FROM members WHERE username = '$username'";
$memberResult = mysqli_query($conn, $memberQuery);

if (mysqli_num_rows($memberResult) == 0) {
    echo json_encode(["message" => "No member found with the given username"]);
    exit();
}

$member = mysqli_fetch_assoc($memberResult);
$memberID = $member['memberID'];

// Fetch recipient's parentID from the parent table based on memberID and parent name
$parentQuery = "SELECT parentID FROM parent WHERE memberID = $memberID AND name = '$parentName'";
$parentResult = mysqli_query($conn, $parentQuery);

if (mysqli_num_rows($parentResult) == 0) {
    echo json_encode(["message" => "No parent found with the given memberID and parent name"]);
    exit();
}

$parent = mysqli_fetch_assoc($parentResult);
$recipientParentID = $parent['parentID'];

// Insert into the contracts table
$sql = "INSERT INTO contracts (caregiverID, recipientID, recipientParentID, startDate, endDate, weeklyHours) 
        VALUES ($caregiverID, $memberID, $recipientParentID, '$startDate', '$endDate', $weeklyHours)";

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