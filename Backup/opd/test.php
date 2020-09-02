<!DOCTYPE html>
<html>
<head>
	<title></title>
	<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
</head>
<body>
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
            <div style="background-color: #f7f7f7;">
                <div class="page-section-content vc_row-fluid mk-grid full-width-5">
                    <script src="../admin/js/jquery.js"></script>
                    <style type="text/css">
                    .form-group {
    margin-bottom: 15px;
}


                    .form-control {
    display: block;
    width: 50%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
                    </style>
                      
                   
                        <label class="select-label">Travel Type</label>
                        <div class="form-group col-md-6">
                                            <div class="form-group">
                                            <select class="form-control"  name="company" onChange="gettabledata(this.value);" id="company-list">
                                            <option value="">Select Speciality</option>
                                            <?php
                                            $dbhost = '64.207.177.102';
                                                $dbuser = 'shrushusha';
                                                $dbpass = 'Lbgb78#7';
                                                $conn = mysql_connect($dbhost, $dbuser, $dbpass);
                                                 mysql_select_db('db_shushrusha');
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
                                            </div>    
                            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

                                <table class="table table-bordered" id="tbldata">
                                </table>

</body>
</html>