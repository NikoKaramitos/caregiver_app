<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

header('Content-Type: application/json');

include 'db.php';

$memberID = intval($_GET['memberID']);

if ($memberID <= 0) {
    echo json_encode(["message" => "Invalid memberID"]);
    exit();
}

try {
    $careReceivingContracts = [];
    $careGivingContracts = [];

    // Fetch Care Receiving Contracts (where the user is the recipient)
    $careReceivingQuery = "
        SELECT 
            c.contractID,
            c.weeklyHours,
            c.startDate,
            c.endDate,
            c.approval AS approved,
            m.name AS caregiverName,
            m.phone AS caregiverPhone,
            p.name AS parentName,
            p.address AS parentAddress
        FROM 
            contracts c
        INNER JOIN 
            parent p ON c.recipientParentID = p.parentID
        INNER JOIN 
            members m ON c.caregiverID = m.memberID
        WHERE 
            c.recipientID = $memberID
    ";

    $careReceivingResult = mysqli_query($conn, $careReceivingQuery);

    if ($careReceivingResult) {
        while ($contract = mysqli_fetch_assoc($careReceivingResult)) {
            $careReceivingContracts[] = $contract;
        }
    } else {
        error_log("Error fetching care receiving contracts: " . mysqli_error($conn));
    }

    // Fetch Care Giving Contracts (where the user is the caregiver)
    $careGivingQuery = "
        SELECT 
            c.contractID,
            c.weeklyHours,
            c.startDate,
            c.endDate,
            c.approval AS approved,
            m.name AS recipientName,
            m.phone AS recipientPhone,
            p.name AS parentName,
            p.address AS parentAddress
        FROM 
            contracts c
        INNER JOIN 
            parent p ON c.recipientParentID = p.parentID
        INNER JOIN 
            members m ON c.recipientID = m.memberID
        WHERE 
            c.caregiverID = $memberID
    ";

    $careGivingResult = mysqli_query($conn, $careGivingQuery);

    if ($careGivingResult) {
        while ($contract = mysqli_fetch_assoc($careGivingResult)) {
            $careGivingContracts[] = $contract;
        }
    } else {
        error_log("Error fetching care giving contracts: " . mysqli_error($conn));
    }

    echo json_encode([
        "message" => "Contracts fetched successfully",
        "careReceivingContracts" => $careReceivingContracts,
        "careGivingContracts" => $careGivingContracts
    ]);

} catch (Exception $e) {
    error_log("Exception in getContracts.php: " . $e->getMessage());
    echo json_encode(["message" => "Error: " . $e->getMessage()]);
}

mysqli_close($conn);
?>
