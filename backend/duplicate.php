<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

$inData = getRequestInfo();
$username = $inData['username'];
$email = $inData['email'];

$conn = new mysqli("127.0.0.1", "root", "", "WeCare");
if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    // Check if username exists
    $stmt = $conn->prepare("SELECT memberID FROM members WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result(); // Needed to get num_rows

    if ($stmt->num_rows > 0) {
        // Username already taken
        // http_response_code(409);
        returnWithError("Username already taken");
    } else {
        $stmt->close(); // Close previous statement

        // Check if email exists
        $stmt = $conn->prepare("SELECT memberID FROM members WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            // Email already in use
            // http_response_code(409);
            returnWithError("Email already in use");
        } else {
            // Both username and email are available
            http_response_code(200);
            returnWithError(""); // You can also return a success message here
        }
    }

    $stmt->close();
    $conn->close();
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson($obj)
{
    header('Content-type: application/json');
    echo $obj;
}

function returnWithError($err)
{
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson($retValue);
}
?>
