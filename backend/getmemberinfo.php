<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

header('Content-Type: application/json'); // Set response type to JSON

// Include your database connection
include 'db.php'; // Ensure db.php contains the database connection

// Get the memberID from the query parameter
$memberID = isset($_GET['memberID']) ? intval($_GET['memberID']) : 0;

if ($memberID <= 0) {
    echo json_encode(["message" => "Invalid memberID"]);
    exit();
}

// SQL query to fetch member data
$sql = "SELECT 
		username,
            	name, 
            	phone, 
            	email, 
            	address, 
            	timeAvailable,
		careDollars,
            	profilePictureURL, 
		lastTenRatings,
            	rate 
        FROM members 
        WHERE memberID = $memberID";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode([
        "message" => "Member found",
        "name" => $row['name'],
        "phone" => $row['phone'],
        "email" => $row['email'],
        "address" => $row['address'],
        "timeAvailable" => $row['timeAvailable'],
	"careDollars" => $row['careDollars'],
        "profilePictureURL" => $row['profilePictureURL'],
	"lastTenRatings" => $row['lastTenRatings'],
        "rate" => $row['rate'],
    ]);
} else {
    echo json_encode(["message" => "Member not found"]);
}

$conn->close();
?>
