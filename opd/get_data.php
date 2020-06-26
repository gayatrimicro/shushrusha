<?php
$dbhost = '64.207.177.102';
$dbuser = 'shrushusha';
$dbpass = 'Lbgb78#7';
$conn = mysql_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
die('Could not connect: ' . mysql_error());
}

$sid=$_POST['sid'];
?>


<table class="table table-bordered table-responsive">
								<thead>
				                      <tr>
				                      
				                        
				                        <!-- <th>FCT Code</th> -->
				                        <th>Doctor Name</th>
				                        <th>Session</th>
				                        <th colspan="2">Monday</th>
				                        <th colspan="2">Tuesday</th>
				                        <th colspan="2">Wednesday</th>
				                        <th colspan="2">Thursday</th>
				                        <th colspan="2">Friday</th>
				                        <th colspan="2">Saturday</th>
				                        
				                      </tr>
				                      <tr>
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
										
				                        mysql_connect("64.207.177.102","shrushusha","Lbgb78#7");
                        				mysql_select_db("db_shushrusha");
				                       $getcompany = mysql_query("SELECT * FROM tbl_doctors  where sid= $sid");
				                        ?>
				                        <?php
				                        If (mysql_num_rows($getcompany) > 0) {
				                          while ($row = mysql_fetch_array($getcompany)) {
				                            // var_dump($row);
				                          ?>
				                      <tr>
				                      
				                       
				                        
				                        
				                        <td><?php echo $row['fct_name']; ?></td>
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
				                      </tr>
				                        <?php
				              }
				          }
				          ?>
				                    </tbody>
				                </table>
				                   