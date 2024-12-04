<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

header('Content-Type: application/json');

include 'db.php';

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (is_null($data) || !isset($data['contractID'])) {
    http_response_code(400);
    echo json_encode(["message" => "No input data received or invalid JSON"]);
    exit();
}

$contractID = intval($data['contractID']);

if ($contractID <= 0) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid contractID"]);
    exit();
}

try {
    // Delete the contract
    $deleteContractQuery = "DELETE FROM contracts WHERE contractID = $contractID";
    if (!mysqli_query($conn, $deleteContractQuery)) {
        throw new Exception("Error deleting contract: " . mysqli_error($conn));
    }

    echo json_encode(["message" => "Contract rejected and deleted successfully."]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(["message" => "Error: " . $e->getMessage()]);
}

mysqli_close($conn);
?>
