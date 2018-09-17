<?php
include 'DBConfig.php';

$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

$json = file_get_contents('php://input');
$obj = json_decode($json,true);

$id = $obj['id'];

$sql_Query = "DELETE FROM student WHERE studID = '$id'";

if(mysqli_query($con,$sql_Query)){
$MSG = 'Deleted Successfully' ;
$json = json_encode($MSG);
echo $json ;
}
else{
        
echo 'Try Again';
        
}
 mysqli_close($con);
?>