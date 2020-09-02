<?php
include('../db.php');

 $sql = " SELECT * FROM  tbl_car_company";
 $sql2 = " SELECT * FROM  tbl_car_model";
 // $sql2 = "SELECT * FROM `tbl_car_parts` cp LEFT JOIN tbl_car_model cm ON cm.model";

$result = mysql_query($sql) or die(mysql_error());
$result2 = mysql_query($sql2) or die(mysql_error());
// $result2 = mysql_query($sql2) or die(mysql_error());
// while ($row = mysql_fetch_array($result1)) {
// var_dump($row);
// }
// exit();
//  If (mysql_num_rows($result) > 0) {
//     while ($row = mysql_fetch_array($result)) {
        
//        echo '<pre>' . var_dump($row) . '</pre>';
//     }
// }
// exit();
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Admin Panel</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- jQuery UI -->
    <link href="https://code.jquery.com/ui/1.10.3/themes/redmond/jquery-ui.css" rel="stylesheet" media="screen">

    <!-- Bootstrap -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!-- styles -->
    <link href="css/styles.css" rel="stylesheet">

    <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
    <link href="vendors/form-helpers/css/bootstrap-formhelpers.min.css" rel="stylesheet">
    <link href="vendors/select/bootstrap-select.min.css" rel="stylesheet">
    <link href="vendors/tags/css/bootstrap-tags.css" rel="stylesheet">

    <link href="css/forms.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
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
	                      <li class="dropdown">
	                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">My Account <b class="caret"></b></a>
	                        <ul class="dropdown-menu animated fadeInUp">
	                          <li><a href="profile.html">Profile</a></li>
	                          <li><a href="login.html">Logout</a></li>
	                        </ul>
	                      </li>
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
                   
                    <li><a href="addpage.php">Add page</a></li>
                   	<li><a href="modelparts.php">Model parts</a></li>
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
					            <div class="panel-title">Add Moddels parts</div>
					          
					            <div class="panel-options">
					              <a href="#" data-rel="collapse"><i class="glyphicon glyphicon-refresh"></i></a>
					              <a href="#" data-rel="reload"><i class="glyphicon glyphicon-cog"></i></a>
					            </div>
					        </div>
			  				<div class="panel-body">
			  					<form class="form-horizontal" role="form">
								  <div class="form-group">
								    <label class="col-md-3 control-label" for="select-1">Select Company</label>
											<div class="col-md-5">

													<div class="bfh-selectbox" data-name="selectbox3" data-value="12" data-filter="true">
														 <?php 
					                                        If (mysql_num_rows($result) > 0) {
					                                           
					                                             while ($row = mysql_fetch_array($result)) {
					                                             
					                                       ?>
													  <div data-value="<?php echo $row['id']; ?>"><?php echo $row['car_company']; ?></div>
													 
													  <?php }
													  } ?>
													</div>
											</div>
													
								  </div><br>

								   <div class="panel-title2">Page Body :</div><br>
								   <br>
								  <div class="form-group">

								    <label for="color" class="col-sm-3 control-label">Top Color</label>
								    <div class="col-sm-5">
								     <!--  <input type="color" name="favcolor" value="#ff0000"> -->
								     <div class="bfh-colorpicker" data-name="colorpicker1"></div>
								    </div>
								  </div>
								  <div class="form-group">
								    <label class="col-sm-3 control-label">Top Image</label>
								    <div class="col-sm-9">
								      	<input type="file" class="btn btn-default" id="topimage">
												<p class="help-block">
												Image size : 683 X 260 (500kb)
												</p>
								    </div>
								  </div>
								  <div class="form-group">
								    <label for="color" class="col-sm-3 control-label">Bottom Color</label>
								    <div class="col-sm-5">
								      <div class="bfh-colorpicker" data-name="colorpicker1"></div>
								    </div>
								  </div>
								  <div class="form-group">
								    <label class="col-sm-3 control-label">bottom Image</label>
								    <div class="col-sm-9">
								      	<input type="file" class="btn btn-default" id="topimage">
												<p class="help-block">
												Image size : 683 X 260 (500kb)
												</p>
								    </div>
								  </div>
								
								  <div class="form-group">
								    <div class="col-sm-offset-3 col-sm-9">
								      <button class="btn btn-primary" type="submit">
													<i class="fa fa-save"></i>
													Submit
									  </button>
								    </div>
								  </div>
								</form>
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
    <script src="https://code.jquery.com/jquery.js"></script>
    <!-- jQuery UI -->
    <script src="https://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="bootstrap/js/bootstrap.min.js"></script>

    <script src="vendors/form-helpers/js/bootstrap-formhelpers.min.js"></script>

    <script src="vendors/select/bootstrap-select.min.js"></script>

    <script src="vendors/tags/js/bootstrap-tags.min.js"></script>

    <script src="vendors/mask/jquery.maskedinput.min.js"></script>

    <script src="vendors/moment/moment.min.js"></script>

    <script src="vendors/wizard/jquery.bootstrap.wizard.min.js"></script>

     <!-- bootstrap-datetimepicker -->
     <link href="vendors/bootstrap-datetimepicker/datetimepicker.css" rel="stylesheet">
     <script src="vendors/bootstrap-datetimepicker/bootstrap-datetimepicker.js"></script> 


    <link href="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/css/bootstrap-editable.css" rel="stylesheet"/>
	<script src="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/js/bootstrap-editable.min.js"></script>

    <script src="js/custom.js"></script>
    <script src="js/forms.js"></script>
  </body>
</html>