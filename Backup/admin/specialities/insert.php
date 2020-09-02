<?php 

session_start();
  if($_SESSION["username"]=="admin")
  {
    // echo "Welcome to you<br>";
    // echo "<a href='logout.php'>Logout</a>";
  }
  else
  {
    header("location:../index.php");
  }

include('../../db.php');


$query = "INSERT INTO tbl_specialities (speciality) VALUES('" . $_POST["speciality"] . "')";
$result = mysql_query($query) or die(mysql_error());
if ($result) {

    header('Location: index.php');
}

	

else{
	echo "Fail data submit";
	    die('Invalid query: ' . mysql_error());
}
?>