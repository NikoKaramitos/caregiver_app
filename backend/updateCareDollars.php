<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

$servername = "localhost"; // Your MySQL server
$username = "root";        // Your MySQL username
$password = "";            // Your MySQL password
$dbname = "wecare_webapp_db"; // Your database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['amount'])) {
    echo json_encode(["message" => "it is set.", "amount" => $amount]);
}

if(!is_numeric($data['amount'])){
    echo json_encode(["message" => "it is set.", "amount" => $amount]);
    echo json_encode("it is numeric");
}

// if (isset($data['amount']) && is_numeric($data['amount']) && $data['amount'] > 0) {
//     $amount = $conn->real_escape_string($data['amount']); // Sanitize input to prevent SQL injection

//     $caregiverID = 1; // You should get the caregiver ID from the front-end or session
//     $sql = "UPDATE members SET careDollars = careDollars + $amount WHERE id = $caregiverID";

//     if ($conn->query($sql) === TRUE) {
//         echo json_encode(["message" => "Care dollars successfully updated.", "amount" => $amount]);
//     } else {
//         echo json_encode(["error" => "Error updating care dollars: " . $conn->error]);
//     }
// } else {
//     echo json_encode(["error" => "Invalid input. Please provide a valid amount of care dollars."]);
// }

$conn->close();
?>
