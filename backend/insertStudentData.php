<?php
include 'DBConfig.php';

$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

$json = file_get_contents('php://input');
$obj = json_decode($json,true);

$name = $obj['name'];
$kelas = $obj['kelas'];
$phone = $obj['phone'];
$email = $obj['email'];

$Sql_Query = "INSERT INTO student(studName,studClass,studPhone,studEmail) VALUES ('$name','$kelas','$phone','$email')";
if(mysqli_query($con,$Sql_Query)){
    $MSG = 'Success!';
    $json = json_encode($MSG);
    echo $json;
}
else{
    echo 'Try Again';
}
mysqli_close($con);
?>