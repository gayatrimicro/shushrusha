<?php
include('/db.php');

 $sql = " SELECT * FROM  tbl_car_company";
 $sql2 = " SELECT * FROM  tbl_car_model";
 // $sql2 = "SELECT * FROM `tbl_car_parts` cp LEFT JOIN tbl_car_model cm ON cm.model";
 mysql_select_db('db_vipco');
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
    <style type="text/css">
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
                   	<li><a href="parts.php">Model parts</a></li>
                   	<li><a href="addcarmodels/">Add Car Models</a></li>
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

			  				<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
					        <script type="text/javascript">
						   $(document).ready(function(){
							    var flagctn = 2;
							    $("#buttonadddata").click(function () {
							  if(flagctn>10){
							            alert("Only Limit 10 simple data to textboxes allow");
							            return false;
							  }
							  var newTextBoxDiv = $(document.createElement('div'))
							       .attr("id", 'TextBoxDiv' + flagctn);
							  newTextBoxDiv.after().html('<label>Part Name #'+ flagctn + ' : </label>' +
							        '<input class="form-control" placeholder="Enter Part Name" type="text" name="part_name' + flagctn +
							        '" id="textbox1' + flagctn + '" value="" > ' + '<label>Part Number #'+ flagctn + ' : </label>' +
							        '<input class="form-control" placeholder="Enter Part Number" type="text" name="part_number' + flagctn +
							        '" id="textbox2' + flagctn + '" value="" > <br>');

							  newTextBoxDiv.appendTo("#BoxTextGroup");
							  flagctn++;
							     });
							     $("#removeButton").click(function () {
							  if(flagctn==1){
							          alert("here error display No more any textbox to remove records");
							          return false;
							       }
							  flagctn--;
							        $("#TextBoxDiv" + flagctn).remove();
							     });
							     $("#getButtonValue").click(function () {
							  var msg = '';
							  var msg2='';
							  for(i=1; i<flagctn; i++){
							       msg += "\n Textbox #" + i + " : " + $('#textbox1' + i).val();
							       msg2 += "\n Textbox #" + i + " : " + $('#textbox2' + i).val();
							  }
							        alert("Display message here"+msg+msg2);
							     });
							  });
						   function makeSearch() {
					  alert("Code to make AJAX Call");
					  $.ajax({
						    data: ('msg=' + msg, 'msg2=' + msg2),
						    url: 'form.php',
						    method: 'POST', // or GET
						    success: function(msg) {
						        alert(msg);
						    }
						});
					}
					    </script>
					  
			  				<div class="panel-body">
			  					<div class="row">
			  						<div class="col-md-6">
				  					<form action="form.php" method="post" onsubmit="return makeSearch()">
										<fieldset>
											<div>
						  						<h4>Select</h4>
						  						<p>

						  							<div class="bfh-selectbox" data-name="selectbox3" data-value="12" data-filter="true">
						  								<?php 
						                                     If (mysql_num_rows($result) > 0) {
						                                        
						                                        while ($row = mysql_fetch_array($result)) {
						                                             
						                                   ?>
														  <div data-value="<?php echo $row['id']; ?>">
														  	<?php echo $row['car_company']; ?>
														  	<input type="hidden" name="company_id"  value="<?php echo $row['id']; ?>" />
														  </div>
													   <?php }
														  } ?>
													</div>
						  						</p>
						  					</div>
						  					<div>
						  						<h4>Select</h4>
						  						<p>

						  							<div class="bfh-selectbox" data-name="selectbox3" data-value="12" data-filter="true">
						  								<?php 
						                                     If (mysql_num_rows($result2) > 0) {
						                                        
						                                        while ($row2 = mysql_fetch_array($result2)) {
						                                             
						                                   ?>
														  <div data-value="<?php echo $row2['model_id']; ?>">
														  	<input type="hidden" name="model_id"  value="<?php echo $row2['model_id']; ?>" />
														  	<?php echo $row2['model']; ?>
														  	
														  </div>
													  	 <?php }
														  } ?>
													</div>
						  						</p>
						  					</div>
						  					
											<div>
										
											<div class="form-group"  id='BoxTextGroup'>
											<div id="TextBoxDiv1" >
											<label>Part name</label>
											<input class="form-control" id='textbox1' required="" name="part_name" placeholder="Enter Part Name" type="text">
											<label>Part number</label>
											<input class="form-control" id='textbox2' required="" name="part_number" placeholder="Enter Part Number" type="text"><br>
											</div>
										</div>
												<div id="field_div">

													<input type='button' class="formmdval" value='Add Button' id='buttonadddata'>
<input type='button' class="formmdval" value='Remove Button' id='removeButton'>
<input type='button' class="formmdval" value='Data Get TextBox Value' id='getButtonValue'>

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