<?php
include('../../db.php');

if ($_POST['action'] && $_POST['id']) {
  
    // edit the post with $_POST['id']
    $id= $_POST['id'];
    $query1="DELETE FROM tbl_doctors WHERE id = $id";
    $result = mysql_query($query1) or die(mysql_error());
        if($query1)
          {
         echo "delete success";
         header("Location: index.php"); /* Redirect browser */
          exit();
         }
          else{
            echo "Error in delete";
          }
  

}
   
   
?>