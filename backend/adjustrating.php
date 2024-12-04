<?php
header('Content-Type: application/json');

// Include database connection
include 'db.php';

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

// Extract and sanitize input
$username = mysqli_real_escape_string($conn, $data['username']);
$newRating = floatval($data['newRating']);

// Validate rating range
if ($newRating < 1 || $newRating > 5) {
    echo json_encode(["message" => "Error: Rating must be between 1 and 5."]);
    mysqli_close($conn);
    exit();
}

// Fetch current lastTenRatings, totalStars, and ratingCount
$query = "SELECT lastTenRatings, totalStars, ratingCount FROM members WHERE username = '$username'";
$result = mysqli_query($conn, $query);

if ($result && mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $lastTenRatings = $row['lastTenRatings'];
    $totalStars = floatval($row['totalStars']);
    $ratingCount = intval($row['ratingCount']);

    // Convert the string to an array
    $ratingsArray = $lastTenRatings ? explode(',', $lastTenRatings) : [];

    // Append the new rating to the end
    array_push($ratingsArray, $newRating);

    // Keep only the last 10 ratings
    if (count($ratingsArray) > 10) {
        $ratingsArray = array_slice($ratingsArray, -10);
    }

    // Convert back to a string
    $updatedLastTenRatings = implode(',', $ratingsArray);

    // Update totalStars and ratingCount
    $updatedTotalStars = $totalStars + $newRating;
    $updatedRatingCount = $ratingCount + 1;

    // Update the database
    $updateQuery = "
        UPDATE members 
        SET 
            lastTenRatings = '$updatedLastTenRatings', 
            totalStars = $updatedTotalStars, 
            ratingCount = $updatedRatingCount 
        WHERE username = '$username'
    ";

    if (mysqli_query($conn, $updateQuery)) {
        echo json_encode([
            "message" => "Rating updated successfully",
            "lastTenRatings" => $ratingsArray,
            "totalStars" => $updatedTotalStars,
            "ratingCount" => $updatedRatingCount,
        ]);
    } else {
        echo json_encode(["message" => "Error updating ratings: " . mysqli_error($conn)]);
    }
} else {
    echo json_encode(["message" => "Error: Member not found."]);
}

mysqli_close($conn);
?>
