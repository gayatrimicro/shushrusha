<?php 

if($_POST['speciality_id']=="")
{
$_POST['speciality_id'] ="1";
echo "This is " . $_POST['speciality_id'];
}

if(isset($_POST['monday']))
{
 $monday="1";
}
else{
  $monday="0";
}
if(isset($_POST['tuesday']))
{
 $tuesday="1";
}
else{
  $tuesday="0";
}
if(isset($_POST['wednesday']))
{
 $wednesday="1";
}
else{
  $wednesday="0";
}
if(isset($_POST['thursday']))
{
 $thursday="1";
}
else{
  $thursday="0";
}
if(isset($_POST['friday']))
{
 $friday="1";
}
else{
  $friday="0";
}
if(isset($_POST['saturday']))
{
 $saturday="1";
}
else{
  $saturday="0";
}

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


// $query = "INSERT INTO tbl_doctors ('sid','dcd',fct_code,fct_name,session,
// mon_f_time, mon_t_time,tue_f_time,tue_t_time,wed_f_time,wed_t_time,
// thu_f_time, thu_t_time,fri_f_time,fri_t_time,sat_f_time,sat_t_time) VALUES(" .
// $_POST["speciality_id"]. ",
// " .$_POST["fct_code"]. ",
// " .$_POST["fct_name"].",
// " .$_POST["session"].",
// " .$_POST["mon_f_time"].",
// " .$_POST["mon_t_time"].",
// " .$_POST["tue_f_time"].",
// " .$_POST["tue_t_time"]."',
// " .$_POST["wed_f_time"].",
// " .$_POST["wed_t_time"].",
// " .$_POST["thu_f_time"].",
// " .$_POST["thu_t_time"].",
// " .$_POST["fri_f_time"].",
// " .$_POST["fri_t_time"].",
// " .$_POST["sat_f_time"].",
// " .$_POST["sat_t_time"].")";  
$query ="INSERT INTO tbl_doctors(`sid`, `fct_code`,`fct_name`,`session`,`mon_f_time`,
`mon_t_time`,`monday`,`tue_f_time`,`tue_t_time`,`tuesday`,`wed_f_time`,`wed_t_time`,`wednesday`,`thu_f_time`,`thu_t_time`,`thursday`,
`fri_f_time`,`fri_t_time`,`friday`,`sat_f_time`,`sat_t_time`,`saturday`) 
VALUES ('" .$_POST["speciality_id"]. "','" .$_POST["fct_code"]. "',
'" .$_POST["fct_name"]. "','" .$_POST["session"]. "',
'" .$_POST["mon_f_time"]. "','" .$_POST["mon_t_time"]. "', '$monday',
'" .$_POST["tue_f_time"]. "','" .$_POST["tue_t_time"]. "', '$tuesday',
'" .$_POST["wed_f_time"]. "','" .$_POST["wed_t_time"]. "', '$wednesday',
'" .$_POST["thu_f_time"]. "','" .$_POST["thu_t_time"]. "', '$thursday',
'" .$_POST["fri_f_time"]. "','" .$_POST["fri_t_time"]. "', '$friday',
'" .$_POST["sat_f_time"]. "','" .$_POST["sat_t_time"]. "', '$saturday')";

$result =mysql_query($query) or die(mysql_error());  

if ($result) {

    header('Location: index.php');
}

	

else{
	echo "Fail data submit";
	    die('Invalid query: ' . mysql_error());
}
?>