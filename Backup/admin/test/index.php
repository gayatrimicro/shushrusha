<?php
//include connection file 
include_once("connection.php");
$sql = "SELECT * FROM tbl_car_parts p JOIN tbl_car_model sl ON sl.model_id = p.model_id AND sl.model_id = 8";
$queryRecords = mysqli_query($conn, $sql) or die("error to fetch parts data");
?>
<!DOCTYPE html>
<html>
<head>
	<title></title>
	 <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.1.js"></script>
	<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
</head>
<body>

	<script type="text/javascript">
$(document).ready(function(){
  $('td.editable-col').on('focusout', function() {
    data = {};
    data['val'] = $(this).text();
    data['id'] = $(this).parent('tr').attr('data-row-id');
    data['index'] = $(this).attr('col-index');
      if($(this).attr('oldVal') === data['val'])
    return false;
    
    $.ajax({   
          
          type: "POST",  
          url: "server.php",  
          cache:false,  
          data: data,
          dataType: "json",       
          success: function(response)  
          {   
            //$("#loading").hide();
            if(response.status) {
              $("#msg").removeClass('alert-danger');
              $("#msg").addClass('alert-success').html(response.msg);
            } else {
              $("#msg").removeClass('alert-success');
              $("#msg").addClass('alert-danger').html(response.msg);
            }
          }   
        });
  });
});

</script>

<table id="employee_grid" class="table table-condensed table-hover table-striped bootgrid-table" width="60%" cellspacing="0">
   <thead>
      <tr>
      	 <th>#</th>
         <th>Model Name</th>
         <th>Part Name</th>
         <th>Part Number</th>
      </tr>
   </thead>
   <tbody id="_editable_table">
      <?php foreach($queryRecords as $res) :?>
      <tr data-row-id="<?php echo $res['id'];?>">
       <td><?php echo $res['id'];?></td>

         <td><?php echo $res['model'];?></td>
         <td class="editable-col" contenteditable="true" col-index='1' oldVal ="<?php echo $res['part_name'];?>"><?php echo $res['part_name'];?></td>
         <td class="editable-col" contenteditable="true" col-index='2' oldVal ="<?php echo $res['part_number'];?>"><?php echo $res['part_number'];?></td>
      </tr>
    <?php endforeach;?>
   </tbody>
</table>
</body>
</html>