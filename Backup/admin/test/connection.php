<?php
/* Database connection start */
$servername = "64.207.177.102";
$username = "db_user_vipco";
$password = "qWiu95~6";
$dbname = "db_vipco";

$conn = mysqli_connect($servername, $username, $password, $dbname) or die("Connection failed: " . mysqli_connect_error());

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

?>