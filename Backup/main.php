<?php 
	// var_dump($_POST);
	// exit();
 	 $name = $_POST["user_name1"];
 	 // $phone = $_POST["user_phone"];
	 $email = $_POST["user_email1"];
	 $message = $_POST["message"];
	 // $location = $_POST["location"];

	 $subject ="Contact Request " . $name;
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	$headers .= 'From: Shushrusha <' . $email .">" ."\r\n";
	
	// $headers .= 'Cc: birthdayarchive@example.com' . "\r\n";
	// $headers .= 'Bcc: birthdaycheck@example.com' . "\r\n";
	
	   	$message= "<table border='0' cellpadding='4' cellspacing='4' width='100%'>

	   			  <tr><td style='font-size:1.3em;' colspan='2'><strong>Contact Details</strong></td></tr>
	   			   <tr>
	                   <td align='left' width='35%'><strong>First name :</strong></td>
	                   <td align='left' width='60%'>
	                   ".  $name ."</td>
	                 </tr>

	                 

	                 <tr>
	                   <td align='left' width='35%'><strong>Email :</strong></td>
	                   <td align='left' width='60%'>
	                   ". $email ."</td>
	                 </tr>
	   			  	<tr>
	                   <td align='left' width='35%'><strong>Message :</strong></td>
	                   <td align='left' width='60%'>
	                   ". $message ."</td>
	                 </tr>
	                 
	                 
	               </table>";  
	              
	  	  mail("operations@gmicro.us", $subject, $message, $headers);
		// delete the cookie so it cannot sent again by refreshing this page
		setcookie('tntcon','');
		echo "Your enquiry has been sent successfully";
		
	  	//$msg = "Your enquiry has been sent successfully.";
	  	
	
?>