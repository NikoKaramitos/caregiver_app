<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

header('Content-Type: application/json');

include 'db.php'; // Ensure the path is correct and the file is accessible

$memberID = isset($_GET['memberID']) ? intval($_GET['memberID']) : null;
$email = isset($_GET['email']) ? $_GET['email'] : null;

if (!$memberID && !$email) {
    echo json_encode(["message" => "You must provide either memberID or email"]);
    exit();
}

// Prepare the SQL query safely to prevent SQL injection
if ($memberID) {
    $stmt = $conn->prepare("SELECT username, name, email, phone, address, timeAvailable, lastTenRatings FROM members WHERE memberID = ?");
    $stmt->bind_param("i", $memberID);
} else {
    $stmt = $conn->prepare("SELECT username, name, email, phone, address, timeAvailable, lastTenRatings FROM members WHERE email = ?");
    $stmt->bind_param("s", $email);
}

$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $member = $result->fetch_assoc();
    echo json_encode([
        "message" => "Member found",
        "memberID" => $memberID ? $memberID : null,
        "name" => $member['name'],
        "phone" => $member['phone'],
        "address" => $member['address'],
        "timeAvailable" => $member['timeAvailable'],
        "email" => $member['email'],
        "lastTenRatings" => $member['lastTenRatings']
    ]);
} else {
    echo json_encode(["message" => "No member found with the given memberID or email"]);
}

$stmt->close();
$conn->close();
?>
