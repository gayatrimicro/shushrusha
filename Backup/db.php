<?php
$dbhost = 'localhost';
$dbuser = 'user_shush';
$dbpass = '?Hjv05a9';
$conn = mysql_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
die('Could not connect: ' . mysql_error());
}
mysql_select_db('db_shush');
?>