<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

$inData = getRequestInfo();

$conn = new mysqli("127.0.0.1", "root", "", "WeCare");
if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    // Get the username and password from the input data
    $username = $inData['username'];
    $password = $inData['password'];

    // Prepare the SQL statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT memberID, name, phone, address, timeAvailable, careDollars, password FROM members WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        // Retrieve the stored hashed password
        $storedHash = $row['password'];

        // Verify the password
        if (password_verify($password, $storedHash)) {
            // Password is correct, return user info
            http_response_code(200);
            returnWithInfo(
                $row['memberID'],
                $row['name'],
                $row['phone'],
                $row['address'],
                $row['timeAvailable'],
                $row['careDollars'],
            );
        } else {
            // Password is incorrect
            http_response_code(401); // Unauthorized
            returnWithError("Incorrect password");
        }
    } else {
        // Username not found
        http_response_code(404); // Not Found
        returnWithError("User not found");
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
    $retValue = json_encode(["error" => $err]);
    sendResultInfoAsJson($retValue);
}

function returnWithInfo($memberID, $name, $phone, $address, $timeAvailable, $careDollars)
{
    $retValue = json_encode([
        "memberID" => $memberID,
        "name" => $name,
        "phone" => $phone,
        "address" => $address,
        "timeAvailable" => $timeAvailable,
        "careDollars" => $careDollars,
        "error" => ""
    ]);
    sendResultInfoAsJson($retValue);
}
?>
