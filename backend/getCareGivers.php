<?php
// Database connection parameters
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$servername = "127.0.0.1"; // Change if your database is on a different server
$username = "root";        // Your MySQL username
$password = "";            // Your MySQL password
$dbname = "WeCare"; // Your database name
// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch caregiver data from the new_member table
$sql = "SELECT name, careDollars AS rate, rating AS reviews, timeAvailable AS services, address, phone, age, image FROM new_member";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $caregivers = array();

    while ($row = $result->fetch_assoc()) {
        $address = $row['address'];
        $city = extractCityFromAddress($address);

        $row['city'] = $city;

        $caregivers[] = $row;
    }

    echo json_encode($caregivers);
} else {
    echo json_encode([]);
}

$conn->close();


 
// Extract city from an address string. Modify this logic based on your address format. @param string $address @return string
function extractCityFromAddress($address) {
    // Example logic: Assume the city is the second part of the address, separated by commas
    $parts = explode(',', $address);

    return isset($parts[1]) ? trim($parts[1]) : 'Unknown City';
}
?>