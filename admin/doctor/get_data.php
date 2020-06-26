<?php
include('../../db.php');
$sid=$_POST['sid'];
?>



<thead>
				                      <tr>
				                      
				                        <th>#</th>
				                        <th>FCT Code</th>
				                        <th>FCT Name</th>
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
										
				                        
				                       	$getcompany = mysql_query("SELECT * FROM tbl_doctors  where sid= $sid");
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
				                        	 else {
				                        	 	# code...
				                        	 	echo date('h:i:s a', strtotime($row['mon_f_time']));
				                        	 }
				                        	 ?>
				                        	
				                        </td>
				                        <td>
				                        	<?php
				                        	if($row['monday']==1){
				                        	 echo "";
				                        	 }
				                        	 else {
				                        	 	# code...
				                        	 	echo date('h:i:s a', strtotime($row['mon_t_time']));
				                        	 }
				                        	 ?>
				                        	
				                        </td>
				                        <!-- Tuesday -->
				                        <td>
				                        	<?php
				                        	if($row['tuesday']==1){
				                        	 echo "";
				                        	 }
				                        	 else {
				                        	 	# code...
				                        	 	echo date('h:i:s a', strtotime($row['tue_f_time']));
				                        	 }
				                        	 ?>
				                        	
				                        </td>
				                        <td>
				                        	<?php
				                        	if($row['tuesday']==1){
				                        	 echo "";
				                        	 }
				                        	 else {
				                        	 	# code...
				                        	 	echo date('h:i:s a', strtotime($row['tue_t_time']));
				                        	 }
				                        	 ?>
				                        	
				                        </td>
				                        <!-- Wednesday -->
				                        <td>
				                        	<?php
				                        	if($row['wednesday']==1){
				                        	 echo "";
				                        	 }
				                        	 else {
				                        	 	# code...
				                        	 	echo date('h:i:s a', strtotime($row['wed_f_time']));
				                        	 }
				                        	 ?>
				                        	
				                        </td>
				                        <td>
				                        	<?php
				                        	if($row['wednesday']==1){
				                        	 echo "";
				                        	 }
				                        	 else {
				                        	 	# code...
				                        	 	echo date('h:i:s a', strtotime($row['wed_t_time']));
				                        	 }
				                        	 ?>
				                        	
				                        </td>
				                        <!-- Thursday -->
				                         <td>
				                        	<?php
				                        	if($row['thursday']==1){
				                        	 echo "";
				                        	 }
				                        	 else {
				                        	 	# code...
				                        	 	echo date('h:i:s a', strtotime($row['thu_f_time']));
				                        	 }
				                        	 ?>
				                        	
				                        </td>
				                        <td>
				                        	<?php
				                        	if($row['thursday']==1){
				                        	 echo "";
				                        	 }
				                        	 else {
				                        	 	# code...
				                        	 	echo date('h:i:s a', strtotime($row['thu_t_time']));
				                        	 }
				                        	 ?>
				                        	
				                        </td>
				                        <!-- Friday -->
				                         <td>
				                        	<?php
				                        	if($row['friday']==1){
				                        	 echo "";
				                        	 }
				                        	 else {
				                        	 	# code...
				                        	 	echo date('h:i:s a', strtotime($row['fri_f_time']));
				                        	 }
				                        	 ?>
				                        	
				                        </td>
				                        <td>
				                        	<?php
				                        	if($row['friday']==1){
				                        	 echo "";
				                        	 }
				                        	 else {
				                        	 	# code...
				                        	 	echo date('h:i:s a', strtotime($row['fri_t_time']));
				                        	 }
				                        	 ?>
				                        	
				                        </td>
				                        <!-- Saturday -->
				                         <td>
				                        	<?php
				                        	if($row['saturday']==1){
				                        	 echo "";
				                        	 }
				                        	 else {
				                        	 	# code...
				                        	 	echo date('h:i:s a', strtotime($row['sat_f_time']));
				                        	 }
				                        	 ?>
				                        	
				                        </td>
				                        <td>
				                        	<?php
				                        	if($row['saturday']==1){
				                        	 echo "";
				                        	 }
				                        	 else {
				                        	 	# code...
				                        	 	echo date('h:i:s a', strtotime($row['sat_t_time']));
				                        	 }
				                        	 ?>
				                        	
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
				                    }
									<?php
									if(!empty($_POST["company_id"])) {
										$query ="SELECT * FROM tbl_car_model WHERE c_id = '" . $_POST["company_id"] . "'";
										
										$result = mysql_query($query) or die(mysql_error());
										var_dump($result);
										echo $_POST["company_id"];

										

									}
									else{
										$_POST["company_id"]=4;
										echo $_POST["company_id"];
									}
									?>