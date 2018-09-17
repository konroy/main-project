<?php
include 'DBConfig.php';

$con = mysqli_connect($HostName, $HostUser, $HostPass, $DatabaseName);
$json = file_get_contents('php://input');

$obj = json_decode($json,true);
$email = $obj['email'];
$password = $obj['password'];

$sql_Query = "select * from user where userEmail = '$email' and userPassword = '$password'";
$check = mysqli_fetch_array(mysqli_query($con,$sql_Query));

if(isset($check)){
    $SuccessLoginMsg = 'Data Matched';
    $SuccessLoginJson = json_encode($SuccessLoginMsg);
    echo $SuccessLoginJson;
}
else{
   $InvalidMSG = 'Invalid Username or Password Please Try Again' ;
   $InvalidMSGJSon = json_encode($InvalidMSG);
    echo $InvalidMSGJSon ;
}
mysqli_close($con);
?>