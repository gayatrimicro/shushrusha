<?php
include('../../db.php');

 $sql = " SELECT * FROM  tbl_specialities";
 $sql2 = " SELECT * FROM  tbl_doctors";
 // $sql2 = "SELECT * FROM `tbl_car_parts` cp LEFT JOIN tbl_car_model cm ON cm.model";
 
$result = mysql_query($sql) or die(mysql_error());
$result2 = mysql_query($sql2) or die(mysql_error());

?>
<!DOCTYPE html>
<html>
  <head>
    <title>Admin Panel</title>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-173470882-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-173470882-1');
</script>
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
                   <li><a href="">Doctors</a></li>
                   	<!-- <li><a href="../addparts/">Model parts</a></li> -->
                   	
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
					            <div class="panel-title">Add Doctors</div>
					          
					            <div class="panel-options">
					              <a href="#" data-rel="collapse"><i class="glyphicon glyphicon-refresh"></i></a>
					              <a href="#" data-rel="reload"><i class="glyphicon glyphicon-cog"></i></a>
					            </div>
					
			  				</div>

			  				<script src="../js/jquery.js"></script>
					        
					  
			  				<div class="panel-body">
			  					<div class="row">
			  						<div class="col-md-6">
				  					<form action="insert.php" method="post" >
										<fieldset>
											<div>
						  						<h4>Select</h4>
						  						<p>

						  							<div class="bfh-selectbox" data-filter="true">

						  								<?php 
						                                     If (mysql_num_rows($result) > 0) {
						                                        
						                                        while ($row = mysql_fetch_array($result)) {
						                                             
						                                   ?>
														  <div data-value="<?php echo $row['id']; ?>">
														  	<?php echo $row['speciality']; ?>
														  	<input type="hidden" name="speciality_id"  value="<?php echo $row['id']; ?>" />
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
											<input required class="form-control"  value="0" id='textbox1' required="" name="fct_code" placeholder="Enter Doctor Code" type="text">
											<br>
											</div>
											<div id="TextBoxDiv2" >
											<label>Doctor Name</label>
											<input class="form-control" id='textbox2' required="" name="fct_name" placeholder="Enter Doctor Name" type="text">
											<br>
											</div>
											<div id="TextBoxDiv2" >
											<label>Session</label>
											<input class="form-control" id='textbox2' required="" name="session" placeholder="Enter Session" type="text">
											<br>
											</div>
											<div id="TextBoxDiv2" >
											<p><label>Monday</label></p>
											<div class="weekinput">
											<input  class="form-control" id='textbox2'  name="mon_f_time" placeholder="Enter From Time" type="time">
											<input  class="form-control input1" id='textbox2' name="mon_t_time" placeholder="Enter To Time" type="time">&nbsp;&nbsp;
											<input id="checkBox" type="checkbox" name="monday">
											</div>
											<br>
											</div>
											<div id="TextBoxDiv2" >
											<p><label>Tuesday</label></p>
											<div class="weekinput">
											<input  class="form-control" id='textbox2' name="tue_f_time" placeholder="Enter From Time" type="time">
											<input  class="form-control input1" id='textbox2' name="tue_t_time" placeholder="Enter To Time" type="time">&nbsp;&nbsp;
											<input id="checkBox" type="checkbox" name="tuesday">
											</div>
											<br>
											</div>
											<div id="TextBoxDiv2" >
											<p><label>Wednesday</label></p>
											<div class="weekinput">
											<input  class="form-control" id='textbox2' name="wed_f_time" placeholder="Enter From Time" type="time">
											<input  class="form-control input1" id='textbox2' name="wed_t_time" placeholder="Enter To Time" type="time">&nbsp;&nbsp;
											<input id="checkBox" type="checkbox" name="wednesday">
											</div>
											<br>
											</div>
											<div id="TextBoxDiv2" >
											<p><label>Thursday</label></p>
											<div class="weekinput">
											<input  class="form-control" id='textbox2' name="thu_f_time" placeholder="Enter From Time" type="time">
											<input  class="form-control input1" id='textbox2' name="thu_t_time" placeholder="Enter To Time" type="time">&nbsp;&nbsp;
											<input id="checkBox" type="checkbox" name="thursday">
											</div>
											<br>
											</div>
											<div id="TextBoxDiv2" >
											<p><label>Friday</label></p>
											<div class="weekinput">
											<input  class="form-control" id='textbox2' name="fri_f_time" placeholder="Enter From Time" type="time">
											<input  class="form-control input1" id='textbox2' name="fri_t_time" placeholder="Enter To Time" type="time">&nbsp;&nbsp;
											<input id="checkBox" type="checkbox" name="friday">
											</div>
											<br>
											</div>
											<div id="TextBoxDiv2" >
											<p><label>Saturday</label></p>
											<div class="weekinput">
											<input  class="form-control" id='textbox2' name="sat_f_time" placeholder="Enter From Time" type="time">
											<input  class="form-control input1" id='textbox2' name="sat_t_time" placeholder="Enter To Time" type="time">&nbsp;&nbsp;
											<input id="checkBox" type="checkbox" name="saturday">
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
		  		

		  		<div class="row">
   	
          				<div class="col-md-12">
          				<h2>Doctors</h2>
          					
          					<script type="text/javascript">
			  				 		
									function gettabledata(val) {
										
									$.ajax({
									type: "POST",
									url: "get_data.php",
									data:'sid='+val,
									success: function(data){
										
										$("#tbldata").html(data);
									}
									});
									
								}
			  				 </script>
          					<div class="form-group col-md-6">
										
											<select class="form-control"  name="company" onChange="gettabledata(this.value);" id="company-list">
											<option value="">Select Speciality</option>
											<?php

											 $sql = "SELECT * FROM  tbl_specialities";
											 $result = mysql_query($sql) or die(mysql_error());
											while ($speciality = mysql_fetch_array($result)) {
												// var_dump($country);


											?>

											<option onChange="gettabledata(this.value);" value="<?php echo $speciality["id"]; ?>"><?php echo $speciality["speciality"]; ?></option>
											<?php
											}
											?>
											</select>
											</div>
            				
              					
				              <div class="table-responsive">          
				                  <table class="table table-striped table-bordered" id="tbldata">
				                    	<thead>
				                      <tr>
				                        <th>#</th>
				                        
				                        <th>Doctor Code</th>
				                        <th>Doctor Name</th>
				                        <th>Session</th>
				                        <th colspan="2">Monday</th>
				                        <th colspan="2">Tuesday</th>
				                        <th colspan="2">Wednesday</th>
				                        <th colspan="2">Thursday</th>
				                        <th colspan="2">Friday</th>
				                        <th colspan="2">Saturday</th>
				                        <th></th>
				                      </tr>
				                      <tr>
				                      		<th></th>
				                      		<th></th>
				                      		<th></th>
				                      		<th></th>
									      <th>From Time</th>
									      <th>To Time</th>
									      <th>From Time</th>
									      <th>To Time</th>
									      <th>From Time</th>
									      <th>To Time</th>
									      <th>From Time</th>
									      <th>To Time</th>
									      <th>From Time</th>
									      <th>To Time</th>
									      <th>From Time</th>
									      <th>To Time</th>
									  </tr>
				                    </thead>
				                    <tbody>
				                    <?php
				                   
										  
										    
										    // Do whatever you want with the $uid
										
				                       
				                       $getcompany = mysql_query("SELECT * FROM `tbl_doctors`");
				                        ?>
				                        <?php
				                        If (mysql_num_rows($getcompany) > 0) {
				                          while ($row = mysql_fetch_array($getcompany)) {
				                            // var_dump($row);
				                          ?>
				                      <tr>
				                      	<td><?php echo $row['id']; ?></td>
				                        <td><?php echo $row['fct_code']; ?></td>
				                        
				                        <td><a href="edit.php?id=<?php echo $row['id']; ?>"><?php echo $row['fct_name']; ?> </a></td>
				                       	<td><?php echo $row['session']; ?></td>
				                       	<!-- Monday -->
				                        <td>
				                        	<?php 
				                        if($row['monday']==1){
				                        	echo "";
				                        }
				                        else{
				                        echo date('h:i:s a', strtotime($row['mon_f_time']));
				                        	}?>
				                        </td>
				                        <td><?php 
				                        if($row['monday']==1){
				                        	echo "";
				                        }
				                        else{
				                        echo date('h:i:s a', strtotime($row['mon_t_time']));
				                        	}?>
				                        </td>
				                        <!-- Tuesday -->
				                        <td><?php 

				                        if($row['tuesday']==1){
				                        	echo "";
				                        }
				                        else{
				                        echo date('h:i:s a', strtotime($row['tue_f_time']));
				                        	}?>
				                        </td>
				                        <td><?php 
				                        if($row['tuesday']==1){
				                        	echo "";
				                        }
				                        else{
				                        echo date('h:i:s a', strtotime($row['tue_t_time']));
				                        	}?>
				                        </td>
				                        <!-- Wednesday -->
				                        <td><?php 
				                        if($row['wednesday']==1){
				                        	echo "";
				                        }
				                        else{
				                        echo date('h:i:s a', strtotime($row['wed_f_time']));
				                        	}?>
				                        </td>
				                        <td><?php 
				                        if($row['wednesday']==1){
				                        	echo "";
				                        }
				                        else{
				                        echo date('h:i:s a', strtotime($row['wed_t_time']));
				                        	}?>
				                        </td>
				                        <!-- Thursday -->
				                        <td><?php 
				                        if($row['thursday']==1){
				                        	echo "";
				                        }
				                        else{
				                        echo date('h:i:s a', strtotime($row['thu_f_time']));
				                        	}?>
				                        </td>
				                        <td><?php 
				                        if($row['thursday']==1){
				                        	echo "";
				                        }
				                        else{
				                        echo date('h:i:s a', strtotime($row['thu_t_time']));
				                        	}?>
				                        </td>
				                        <!-- Friday -->
				                        <td><?php 
				                        if($row['friday']==1){
				                        	echo "";
				                        }
				                        else{
				                        echo date('h:i:s a', strtotime($row['fri_f_time']));
				                        	}?>
				                        </td>
				                          <td><?php 
				                        if($row['friday']==1){
				                        	echo "";
				                        }
				                        else{
				                        echo date('h:i:s a', strtotime($row['fri_t_time']));
				                        	}?>
				                        </td>
				                        <!-- Saturday -->
				                        <td><?php 
				                        if($row['saturday']==1){
				                        	echo "";
				                        }
				                        else{
				                        echo date('h:i:s a', strtotime($row['sat_f_time']));
				                        	}?>
				                        </td>
				                          <td><?php 
				                        if($row['saturday']==1){
				                        	echo "";
				                        }
				                        else{
				                        echo date('h:i:s a', strtotime($row['sat_t_time']));
				                        	}?>
				                        </td>
				                        <td>  
				                          <form action="delete.php" method="post">
				                            <input type="submit" style="padding: 2px 7px;" name="action" onclick="return confirm('Are you sure you want to delete?')" value="delete" class="btn btn-danger">
				                            <input type="hidden" name="id"  value="<?php echo $row['id']; ?>" />
				                          </form>
				                        </td>
				                      
				                      </tr>
				                        <?php
				              }
				          }
				          ?>
				                    </tbody>
				                  </table>

				                  </div>


          				</div>
          				<!-- <div class="col-md-1"></div> -->
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