<?php

include('../../db.php');


$id = $_GET['id'];



$query1=mysql_query("select * from tbl_doctors where id= $id");
$query2=mysql_fetch_array($query1);


 // $sql = " SELECT * FROM  tbl_car_company";
 // $sql2 = " SELECT * FROM  tbl_car_model";
 // $sql2 = "SELECT * FROM `tbl_car_parts` cp LEFT JOIN tbl_car_model cm ON cm.model";
//  mysql_select_db('db_shushrusha');
// $result = mysql_query($sql) or die(mysql_error());
// $result2 = mysql_query($sql2) or die(mysql_error());
if($_POST){
	// var_dump($_POST);
	// exit();
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

	  $id = $_POST['id'];
	  
	// var_dump($_POST);
	// exit();
	$sid = $_POST['sid'];
	
	  $fct_code = $_POST['fct_code'];
      $fct_name = $_POST['fct_name'];
      $session = $_POST['session'];
      
      $mon_f_time = $_POST['mon_f_time'];
      $mon_t_time = $_POST['mon_t_time'];
      $tue_f_time = $_POST['tue_f_time'];
      $tue_t_time = $_POST['tue_t_time'];
      $wed_f_time = $_POST['wed_f_time'];
      $wed_t_time = $_POST['wed_t_time'];
      $thu_f_time = $_POST['thu_f_time'];
      $thu_t_time = $_POST['thu_t_time'];
      $fri_f_time = $_POST['fri_f_time'];
      $fri_t_time = $_POST['fri_t_time'];
      $sat_f_time = $_POST['sat_f_time'];
      $sat_t_time = $_POST['sat_t_time'];
     
      // $mon_f_time = date('g:ia', strtotime($_POST['mon_f_time']));
      // $mon_t_time = date('g:ia', strtotime($_POST['mon_t_time']));
      // $tue_f_time = date('g:ia', strtotime($_POST['tue_f_time']));
      // $tue_t_time = date('g:ia', strtotime($_POST['tue_t_time']));
      // $wed_f_time = date('g:ia', strtotime($_POST['wed_f_time']));
      // $wed_t_time = date('g:ia', strtotime($_POST['wed_t_time']));
      // $thu_f_time = date('g:ia', strtotime($_POST['thu_f_time']));
      // $thu_t_time = date('g:ia', strtotime($_POST['thu_t_time']));
      // $fri_f_time = date('g:ia', strtotime($_POST['fri_f_time']));
      // $fri_t_time = date('g:ia', strtotime($_POST['fri_t_time']));
      // $sat_f_time = date('g:ia', strtotime($_POST['sat_f_time']));
      // $sat_t_time = date('g:ia', strtotime($_POST['sat_t_time']));
      // $query3 = "update tbl_doctors set fct_code='$fct_code', fct_name='$fct_name'
      //  where id='$id'"; 
      $query3 = "update  tbl_doctors set sid='$sid',fct_code='$fct_code', fct_name='$fct_name',session='$session', 
      mon_f_time='$mon_f_time', mon_t_time='$mon_t_time',monday='$monday', 
      tue_f_time='$tue_f_time', tue_t_time='$tue_t_time',tuesday='$tuesday', 
      wed_f_time='$wed_f_time', wed_t_time='$wed_t_time',wednesday='$wednesday', 
      thu_f_time='$thu_f_time', thu_t_time='$thu_t_time',thursday='$thursday', 
      fri_f_time='$fri_f_time', fri_t_time='$fri_t_time',friday='$friday', 
      sat_f_time='$sat_f_time', sat_t_time='$sat_t_time',saturday='$saturday'
       where id='$id'";
        $result = mysql_query($query3) or die(mysql_error());
        
        if ($result) {
        	$message = "right answer";
		echo "<script type='text/javascript'>alert('$message');</script>";
		    header('Location: index.php');
		}
		else{
			$message = "wrong answer";
		echo "<script type='text/javascript'>alert('$message');</script>";
			echo "Not Success";
		}

            // header('location:index.php');
        
        // header("Location: ../addcompany/");
 
 }

?>
<!DOCTYPE html>
<html>
  <head>
    <title>Admin Panel</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- jQuery UI -->
    <link href="../css/jquery-ui.css" rel="stylesheet" media="screen">

    <!-- Bootstrap -->
    <link href="../bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!-- styles -->
    <link href="../css/styles.css" rel="stylesheet">

    <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
    <link href="../vendors/form-helpers/css/bootstrap-formhelpers.min.css" rel="stylesheet">
    <link href="../vendors/select/bootstrap-select.min.css" rel="stylesheet">
    <link href="../vendors/tags/css/bootstrap-tags.css" rel="stylesheet">

    <link href="../css/forms.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
    <style type="text/css">
    @media (min-width: 1024px) {
  
  input[type="text"]
{
  width:400px;
  height:35px;
  margin-right:2px;
  border-radius:3px;
  border:1px solid green;
  padding:5px;
}
  .weekinput{
  	display: flex
  }
  .input1{
  	margin-left: 5px !important;
  }

}


    	input[type="text"]
{
  width:200px;
  height:35px;
  margin-right:2px;
  border-radius:3px;
  border:1px solid green;
  padding:5px;
}
input[type="button"]
{
  background:none;
  color:white;
  border:none;
  width:110px;
  height:35px;
  border-radius:3px;
  background-color:#2c3742;
  font-size:16px;
}
    </style>
  </head>
  <body>
  	<div class="header">
	     <div class="container">
	        <div class="row">
	           <div class="col-md-5">
	              <!-- Logo -->
	              <div class="logo">
	                 <h1><a href="index.html">Admin Panel</a></h1>
	              </div>
	           </div>
	           <div class="col-md-5">
	              <div class="row">
	                <div class="col-lg-12">
	                  <div class="input-group form">
	                       <!-- <input type="text" class="form-control" placeholder="Search...">
	                       <span class="input-group-btn">
	                         <button class="btn btn-primary" type="button">Search</button>
	                       </span> -->
	                  </div>
	                </div>
	              </div>
	           </div>
	           <div class="col-md-2">
	              <div class="navbar navbar-inverse" role="banner">
	                  <nav class="collapse navbar-collapse bs-navbar-collapse navbar-right" role="navigation">
	                    <ul class="nav navbar-nav">
	                   <!--    <li class="dropdown">
	                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">My Account <b class="caret"></b></a>
	                        <ul class="dropdown-menu animated fadeInUp">
	                          
	                          <li><a href="logout.php">Logout</a></li>
	                        </ul>
	                      </li> -->
	                      <li><a href="logout.php">Logout</a></li>
	                    </ul>
	                  </nav>
	              </div>
	           </div>
	        </div>
	     </div>
	</div>

    <div class="page-content">
    	<div class="row">
		  <div class="col-md-2">
		  	<div class="sidebar content-box" style="display: block;">
                <ul class="nav">
                   <li><a href="../specialities">Specialities</a></li>
                   <li><a href="../doctor">Doctors</a></li>
                   	<!-- <li><a target="_parent" href="../addparts/">Model parts</a></li> -->
                   	
                    <!-- <li class="submenu">
                         <a href="#">
                            <i class="glyphicon glyphicon-list"></i> Pages
                            <span class="caret pull-right"></span>
                         </a>
                        
                         <ul>
                            <li><a href="forms.html">Products</a></li>
                            <li><a href="signup.html">Signup</a></li>
                        </ul>
                    </li> -->
                </ul>
             </div>
		  </div>
		  <div class="col-md-10">

	  			<div class="row">
	  				<div class="col-md-12">
	  					<div class="content-box-large">
			  				<div class="panel-heading">
					            <div class="panel-title">Update</div>
					          
					            <div class="panel-options">
					              <a href="#" data-rel="collapse"><i class="glyphicon glyphicon-refresh"></i></a>
					              <a href="#" data-rel="reload"><i class="glyphicon glyphicon-cog"></i></a>
					            </div>
					
			  				</div>

			  				<script src="../js/jquery.js"></script>
					        
					  
			  				<div class="panel-body">
			  					<div class="row">
			  						<div class="col-md-6">
				  					<form action="" method="post" >
										<fieldset>
											<div>
						  						<h4>Select</h4>

						  						<p>

						  							<div class="bfh-selectbox" data-name="selectbox3" data-value="<?php echo $query2['sid']; ?>" data-filter="true">
						  								<?php 
						  									
															$specque="select distinct sid,speciality from tbl_doctors td join tbl_specialities ts on td.sid = ts.id";
															// $result1=mysql_fetch_array($specque,$conn);
						  									$specque1 = mysql_query($specque) or die(mysql_error());
						                                     If (mysql_num_rows($specque1) > 0) {
						                                        
						                                        while ($row = mysql_fetch_array($specque1)) {
						                                           // echo $row['speciality'];
						                                           // exit();  
						                                   ?>
														  <div data-value="<?php echo $row['sid']; ?>">
														  	<?php echo $row['speciality']; ?>
														  	<input type="hidden" name="sid"  value="<?php echo $row['sid']; ?>" />

														  </div>
													   <?php }
														  } ?>
													</div>
						  						</p>
						  					</div>
						  					
						  					
											<div>
										
											<div class="form-group"  id='BoxTextGroup'>
											<div style="display:none" id="TextBoxDiv1" >
											<label>Doctor Code</label>
											<input type="hidden" name="id"  value="<?php echo $query2['id']; ?>" />
											<input required class="form-control" value="<?php echo $query2['fct_code']; ?>" id='textbox1' required="" name="fct_code" placeholder="Enter Doctor Code" type="text">
											<br>
											</div>
											<div id="TextBoxDiv2" >
											<label>Doctor Name</label>
											<input class="form-control" id='textbox2' value="<?php echo $query2['fct_name']; ?>" required="" name="fct_name" placeholder="Enter Doctor Name" type="text">
											<br>
											</div>
											<div id="TextBoxDiv2" >
											<label>Session</label>
											<input value="<?php echo $query2['session']; ?>" class="form-control" id='textbox2' required="" name="session" placeholder="Enter Session" type="text">
											<br>
											</div>
											<div id="TextBoxDiv2" >
											<p><label>Monday</label></p>
											<div class="weekinput">
											
											<?php 
											if($query2['monday']==1){
												?>
												<input  class="form-control" id='textbox2' name="mon_f_time" placeholder="Enter From Time" type="time">
											<input class="form-control input1" id='textbox2' name="mon_t_time" placeholder="Enter To Time" type="time">&nbsp;&nbsp;
												<input id="checkBox" checked type="checkbox" name="monday">

											<?php
											}
											else{
												?>
												<input value="<?php echo $query2['mon_f_time']; ?>"  class="form-control" id='textbox2' name="mon_f_time" placeholder="Enter From Time" type="time">
											<input value="<?php echo $query2['mon_t_time']; ?>" class="form-control input1" id='textbox2' name="mon_t_time" placeholder="Enter To Time" type="time">&nbsp;&nbsp;
												<input id="checkBox" type="checkbox" name="monday">
												<?php
											}
											?> 
											<!-- <input id="checkBox" type="checkbox" name="monday"> -->
											</div>
											<br>
											</div>
											<div id="TextBoxDiv2" >
											<p><label>Tuesday</label></p>
											<div class="weekinput">
											 
											
											<?php 
											if($query2['tuesday']==1){
												?>
												<input class="form-control" id='textbox2' name="tue_f_time" placeholder="Enter From Time" type="time">
											<input class="form-control input1" id='textbox2' name="tue_t_time" placeholder="Enter To Time" type="time">&nbsp;&nbsp;
												<input id="checkBox" checked type="checkbox" name="tuesday">
											<?php
											}
											else{
												?>
												<input value="<?php echo $query2['tue_f_time']; ?>" class="form-control" id='textbox2' name="tue_f_time" placeholder="Enter From Time" type="time">
											<input value="<?php echo $query2['tue_t_time']; ?>" class="form-control input1" id='textbox2' name="tue_t_time" placeholder="Enter To Time" type="time">&nbsp;&nbsp;
												<input id="checkBox" type="checkbox" name="tuesday">
												<?php
											}
											?> 
											</div>
											<br>
											</div>
											<div id="TextBoxDiv2" >
											<p><label>Wednesday</label></p>
											<div class="weekinput">
											<?php 
											if($query2['wednesday']==1){
												?>	
											<input class="form-control" id='textbox2' name="wed_f_time" placeholder="Enter From Time" type="time">
											<input  class="form-control input1" id='textbox2' name="wed_t_time" placeholder="Enter To Time" type="time">&nbsp;&nbsp;
											<input id="checkBox" checked type="checkbox" name="wednesday">
											<?php 
											}
											else{ ?>
												<input value="<?php echo $query2['wed_f_time']; ?>" class="form-control" id='textbox2' name="wed_f_time" placeholder="Enter From Time" type="time">
											<input value="<?php echo $query2['wed_t_time']; ?>" class="form-control input1" id='textbox2' name="wed_t_time" placeholder="Enter To Time" type="time">&nbsp;&nbsp;
											<input id="checkBox" type="checkbox" name="wednesday">
											<?php
											}
											?>
											</div>
											<br>
											</div>
											<div id="TextBoxDiv2" >
											<p><label>Thursday</label></p>
											<div class="weekinput">
											<?php 
											if($query2['thursday']==1){
												?>	
											<input class="form-control" id='textbox2' name="thu_f_time" placeholder="Enter From Time" type="time">
											<input class="form-control input1" id='textbox2' name="thu_t_time" placeholder="Enter To Time" type="time">&nbsp;&nbsp;
											<input id="checkBox" checked type="checkbox" name="thursday">
											<?php 
											}
											else
											{
											?>
											<input value="<?php echo $query2['thu_f_time']; ?>" class="form-control" id='textbox2' name="thu_f_time" placeholder="Enter From Time" type="time">
											<input value="<?php echo $query2['thu_t_time']; ?>" class="form-control input1" id='textbox2'  name="thu_t_time" placeholder="Enter To Time" type="time">&nbsp;&nbsp;
											<input id="checkBox" type="checkbox" name="thursday">
											<?php	
											}
											?>
											</div>
											<br>
											</div>
											<div id="TextBoxDiv2" >
											<p><label>Friday</label></p>
											<div class="weekinput">
											<?php 
											if($query2['friday']==1){
												?>	
											<input class="form-control" id='textbox2' name="fri_f_time" placeholder="Enter From Time" type="time">
											<input class="form-control input1" id='textbox2' name="fri_t_time" placeholder="Enter To Time" type="time">&nbsp;&nbsp;
											<input id="checkBox" checked type="checkbox" name="friday">
											<?php 
											}
											else { 
												?>
											<input value="<?php echo $query2['fri_f_time']; ?>" class="form-control" id='textbox2' name="fri_f_time" placeholder="Enter From Time" type="time">
											<input value="<?php echo $query2['fri_t_time']; ?>" class="form-control input1" id='textbox2' name="fri_t_time" placeholder="Enter To Time" type="time">&nbsp;&nbsp;
											<input id="checkBox" type="checkbox" name="friday">
											<?php	
											}
											?>
											</div>
											<br>
											</div>
											<div id="TextBoxDiv2" >
											<p><label>Saturday</label></p>
											<div class="weekinput">
											<?php 
											if($query2['saturday']==1){
												?>		
											<input class="form-control" id='textbox2'  name="sat_f_time" placeholder="Enter From Time" type="time">
											<input class="form-control input1" id='textbox2' name="sat_t_time" placeholder="Enter To Time" type="time">&nbsp;&nbsp;
											<input id="checkBox" checked type="checkbox" name="saturday">
											<?php 
											}
											else{
												?>
												<input value="<?php echo $query2['sat_f_time']; ?>" class="form-control" id='textbox2' name="sat_f_time" placeholder="Enter From Time" type="time">
											<input value="<?php echo $query2['sat_t_time']; ?>" class="form-control input1" id='textbox2' name="sat_t_time" placeholder="Enter To Time" type="time">&nbsp;&nbsp;
											<input id="checkBox" type="checkbox" name="saturday">
												<?php
											}
											?>
											</div>
											<br>
											</div>
										</div>
												
												<br>
											</div>
										</fieldset>
										<div>
											<button type="submit" class="btn btn-primary">

												<i class="fa fa-save"></i>
												Submit
											</button>
										</div>
									</form>
									</div>
									<div class="col-md-6">
									</div>
			  					</div>
			  				</div>
	  					</div>
	  				
	  				</div>

	  		<!--  Page content -->

		  		</div>
		  		
		  
			</div>
    	</div>

    <footer>
         <div class="container">
         
            <div class="copy text-center">
               Design By : <a href='http://www.ibridgedigital.com/'>iBridge Digital</a>
            </div>
            
         </div>
      </footer>
      	
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->

    <!-- jQuery UI -->
    <script src="../js/jquery-ui.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="../bootstrap/js/bootstrap.min.js"></script>

    <script src="../vendors/form-helpers/js/bootstrap-formhelpers.min.js"></script>

    <script src="../vendors/select/bootstrap-select.min.js"></script>

    <script src="../vendors/tags/js/bootstrap-tags.min.js"></script>

    <!-- <script src="../vendors/mask/jquery.maskedinput.min.js"></script> -->

   <!--  <script src="../vendors/moment/moment.min.js"></script> -->

 <!--    <script src="../vendors/wizard/jquery.bootstrap.wizard.min.js"></script> -->

     <!-- bootstrap-datetimepicker -->
<!--      <link href="../vendors/bootstrap-datetimepicker/datetimepicker.css" rel="stylesheet">
     <script src="../vendors/bootstrap-datetimepicker/bootstrap-datetimepicker.js"></script> --> 


 <!--    <link href="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/css/bootstrap-editable.css" rel="stylesheet"/>
	<script src="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/js/bootstrap-editable.min.js"></script> -->

    <script src="../js/custom.js"></script>
    <script src="../js/forms.js"></script>
  </body>
</html>