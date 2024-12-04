<?php
header('Content-Type: application/json'); // Set response type to JSON

// Include your database connection
include 'db.php'; // Ensure db.php contains the database connection

// Get the memberID from the GET data
$memberID = intval($_GET['memberID']); // Get the memberID from the URL parameter

// Validate that the memberID is valid
if ($memberID <= 0) {
    echo json_encode(["message" => "Invalid memberID"]);
    exit();
}

try {
    // Query to fetch all contracts where the caregiverID matches the memberID
    $query = "
        SELECT contractID, caregiverID, recipientID, recipientParentID, startDate, endDate, weeklyHrs
        FROM contracts
        WHERE caregiverID = $memberID
    ";

    $result = mysqli_query($conn, $query);

    // Check if any contracts are found
    if (mysqli_num_rows($result) == 0) {
        echo json_encode(["message" => "No contracts found for the given caregiverID"]);
        exit();
    }

    // Fetch contracts and build response
    $contracts = [];
    while ($contract = mysqli_fetch_assoc($result)) {
        $contracts[] = $contract;
    }

    // Return contracts as JSON
    echo json_encode([
        "message" => "Contracts fetched successfully",
        "contracts" => $contracts
    ]);

} catch (Exception $e) {
    echo json_encode(["message" => "Error: " . $e->getMessage()]);
}

// Close the database connection
mysqli_close($conn);
?>
