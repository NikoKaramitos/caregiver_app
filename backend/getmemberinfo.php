<?php
$host = '127.0.0.1';
$user = 'root';
$password = '';
$database = 'wecare_webapp_db';

$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

// header('Access-Control-Allow-Origin: http://localhost:3000');
// header('Access-Control-Allow-Methods: GET, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type, Authorization');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}


header('Content-Type: application/json');

$memberID = isset($_GET['memberID']) ? intval($_GET['memberID']) : null;

if (!$memberID ) {
    echo json_encode(["message" => "You must provide either memberID"]);
    exit();
}

// Prepare the SQL query safely to prevent SQL injection
if ($memberID) {
    $stmt = $conn->prepare("SELECT username, name, email, phone, address, timeAvailable, lastTenRatings, totalStars, ratingCount FROM members WHERE memberID = ?");
    $stmt->bind_param("i", $memberID);
} else {
    $stmt = $conn->prepare("SELECT username, name, email, phone, address, timeAvailable, lastTenRatings, totalStars, ratingCount FROM members WHERE email = ?");
    $stmt->bind_param("s", $email);
}

$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $member = $result->fetch_assoc();

    // Calculate the average rating as an integer (rounded)
    $averageRating = ($member['ratingCount'] > 0) 
        ? round($member['totalStars'] / $member['ratingCount']) 
        : 0;

    echo json_encode([
        "message" => "Member found",
        "memberID" => $memberID ? $memberID : null,
        "username" => $member['username'],
        "name" => $member['name'],
        "phone" => $member['phone'],
        "address" => $member['address'],
        "timeAvailable" => $member['timeAvailable'],
        "lastTenRatings" => $member['lastTenRatings'],
        "careDollars"=> $member['careDollars']
        "email" => $member['email'],
        "averageRating" => $averageRating
    ]);
} else {
    echo json_encode(["message" => "No member found with the given memberID or email"]);
}

$stmt->close();
$conn->close();
?>
