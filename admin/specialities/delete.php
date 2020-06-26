<?php
include('../../db.php');


if ($_POST['action'] && $_POST['id']) {
  
    // edit the post with $_POST['id']
    $id= $_POST['id'];
    $query1=mysql_query("DELETE FROM tbl_car_company WHERE id = $id");
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