<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        // Handle preflight requests
        http_response_code(204);
        exit();
    }

    $inData = getRequestInfo();

    $memberID = 0;
    $name = "";
    $phone = "";
    $address = "";
    $timeAvailable = 0;
    $careDollars = 0;
    $rating = 0;


    $conn = new mysqli("127.0.0.1", "root", "", "WeCare");
    if( $conn->connect_error )
    {
        returnWithError( $conn->connect_error );
    }
    else
    {
        $stmt = $conn->prepare("SELECT memberID,name,phone,address, timeAvailable, careDollars, rating FROM members WHERE username=? AND password =?");
        $stmt->bind_param("ss", $inData["username"], $inData["password"]);
        $stmt->execute();
        $result = $stmt->get_result();

        if( $row = $result->fetch_assoc()  )
        {
            http_response_code(200);
            returnWithInfo($row['memberID'], $row['name'], $row['phone'], $row['address'], $row['timeAvailable'], $row['careDollars'], $row['rating'] );
        }
        else
        {
            http_response_code(409);
            returnWithError("No Records Found");
        }

        $stmt->close();
        $conn->close();
    }

    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson( $obj )
    {
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError( $err )
    {
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson( $retValue );
    }

    function returnWithInfo( $memberID, $name, $phone, $address, $timeAvailable, $careDollars, $rating )
    {
        $retValue = '{"memberID":"' . $memberID . '","name":"' . $name . '","phone":"' . $phone . '","address":"' . $address . '","timeAvailable":"' . $timeAvailable . '","careDollars":"' . $careDollars . '","rating":"' . $rating . '","error":""}';
        sendResultInfoAsJson( $retValue );
    }

?>