<?php
// Database connection parameters
$servername = "localhost"; // Change if your database is on a different server
$username = "root";        // Your MySQL username
// $password = "";            // Your MySQL password
$dbname = "wecare_webapp_db"; // Your database name

// Create a connection
$conn = new mysqli($servername, $username, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch caregiver data from the `members` table
$sql = "SELECT name, careDollars AS rate, rating AS reviews, timeAvailable AS services, address, phone FROM members";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $caregivers = array();
    
    // Fetch all rows as an associative array
    while ($row = $result->fetch_assoc()) {
        // Add missing fields with static values
        $row['age'] = 30; // Static value for age
        $row['state'] = "Florida"; // Static value for state
        $row['city'] = "Orlando"; // Static value for city
        $row['statement'] = "This is a static statement."; // Static value for statement
        $row['availability'] = "Mondays + Wednesdays"; // Static value for availability
        $row['image'] = "/path/to/default_image.jpg"; // Static value for profile image

        $caregivers[] = $row;
    }

    // Return data as JSON
    echo json_encode($caregivers);
} else {
    echo json_encode([]);
}

// Close the connection
$conn->close();
?>
