<?php
include 'DBConfig.php';
$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

$json = file_get_contents('php://input');
$obj = json_decode($json,true);

$id = $obj['id'];
$name = $obj['name'];
$kelas = $obj['kelas'];
$phone = $obj['phone'];
$email = $obj['email'];

$sql_Query="UPDATE student 
            SET studName='$name',
            studClass='$kelas',
            studPhone='$phone',
            studEmail='$email'
            WHERE studID = '$id'";

if(mysqli_query($con,$sql_Query)){
$MSG = 'Update Successful!' ;
$json = json_encode($MSG);
echo $json ;
}
else{
    
echo 'Try Again';
    
}
mysqli_close($con);
?>