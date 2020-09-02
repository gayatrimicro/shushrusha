<?php
 include('../../db.php'); 

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
.results tr[visible='false'],
.no-result{
  display:none;
}

.results tr[visible='true']{
  display:table-row;
}

.counter{
  padding:8px; 
  color:#ccc;
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
                   <li><a href="">Specialities</a></li>
                   <li><a href="../doctor/">Add Doctors</a></li>
                   <!-- 	<li><a href="../addparts/">Model parts</a></li> -->
                   
                </ul>
             </div>
		  </div>
		  <div class="col-md-10">

	  			<div class="row">
	  				<div class="col-md-12">
	  					<div class="content-box-large">
			  				<div class="panel-heading">
					            <div class="panel-title">Add Specialities</div>
					          
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
										
											<div class="form-group"  id='BoxTextGroup'>
											<div id="TextBoxDiv1" >
											<label>Speciality name</label>
											<input required class="form-control" id='textbox1' required="" name="speciality" placeholder="Enter Speciality" type="text">
											<br>
											</div>
											<!-- <div id="TextBoxDiv2" >
											<label>Car Model Year</label>
											<input class="form-control" id='textbox2' required="" name="model_year" placeholder="Enter car model" type="text">
											<br>
											</div> -->
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
	  		<!-- <script type="text/javascript">
						$(document).ready(function() {
					  $(".search").keyup(function () {
					    var searchTerm = $(".search").val();
					    var listItem = $('.results tbody').children('tr');
					    var searchSplit = searchTerm.replace(/ /g, "'):containsi('")
					    
					  $.extend($.expr[':'], {'containsi': function(elem, i, match, array){
					        return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
					    }
					  });
					    
					  $(".results tbody tr").not(":containsi('" + searchSplit + "')").each(function(e){
					    $(this).attr('visible','false');
					  });

					  $(".results tbody tr:containsi('" + searchSplit + "')").each(function(e){
					    $(this).attr('visible','true');
					  });

					  var jobCount = $('.results tbody tr[visible="true"]').length;
					    $('.counter').text(jobCount + ' item');

					  if(jobCount == '0') {$('.no-result').show();}
					    else {$('.no-result').hide();}
							  });
					});
					</script> -->
		  		</div>
		  		   <div class="row">
   
          				<div class="col-md-10">
           					
            				<h2>Specialities</h2>
              
				              <div class="table-responsive">          
				                  <table class="table">
				                    <thead>
				                      <tr>
				                        <th>#</th>
				                        <th>Speciality Name</th>
				                       
				                      </tr>
				                    </thead>
				                    <tbody>
				                    <?php
				                        
				                       // $getcompany = mysql_query("SELECT * FROM `tbl_specialities` ORDER BY id DESC ");
                        				$getspeciality = mysql_query("SELECT * FROM `tbl_specialities`");
				                        ?>
				                        <?php
				                        If (mysql_num_rows($getspeciality) > 0) {
				                          while ($row = mysql_fetch_array($getspeciality)) {
				                    
				                          ?>
				                      <tr>
				                      
				                        <td><?php echo $row['id']; ?></td>
				                        
				                        <td><a title="Edit" href="edit.php?id=<?php echo $row['id']; ?>"><?php echo $row['speciality']; ?> </a></td>
				                       
				                        
				                        
				                      
				                      </tr>
				                        <?php
				              }
				          }
				          ?>
				                    </tbody>
				                  </table>
				                  </div>


          				</div>
          				<div class="col-md-2"></div>
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