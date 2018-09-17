<?php
include 'DBConfig.php';

$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
if($conn->connect_error){
    die("Connection failed:".$conn->connect_error);
}

$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$email = $obj['email'];

$sql = "SELECT userID, userName FROM user WHERE userEmail = '$email'";
$result = $conn->query($sql);

if($result->num_rows>0){
    while($row=$result->fetch_assoc()){
        $item = $row;
        $json = json_encode($item);
    }
}
else{
    echo "No results found";
}
echo $json;
$conn->close();
?>