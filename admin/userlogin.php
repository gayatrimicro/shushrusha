<?php
session_start();
$message="";
if(count($_POST)>0) {
    echo "this is post :";
    var_dump($_POST);
    echo "This is post";
        $conn = mysql_connect("localhost","user_selective","iJ&a85d9");
        mysql_select_db("db_selective_marble",$conn);
        $error = "";
        $result = mysql_query("SELECT * FROM tbl_user WHERE email='" . $_POST["email"] . "' and password = '". $_POST["password"]."'");
        $row  = mysql_fetch_array($result);
       
        
        // exit();
       
       
       
        // if(is_array($row)) {
        //     $_SESSION["email"] = $row[email];
        //     $_SESSION["password"] = $row[password];
        //     echo "this is session :";
        //      var_dump($_SESSION);
        //      exit();
        //     header("Location:inventory.php");
        //     } 
        //     else {
        //         $error = '<div class="alert alert-danger">Invalid Login</div>';
        //     }
         $email = $_POST['email'];
        $password = $_POST['password'];
        $emaild =$row['email'];
        $passwordd =$row['password'];
       
        // exit();
        if($email == $emaild && $password == $passwordd){
                
                
                $_SESSION['sid']=session_id();
                $_SESSION["email"] = $email ;
                $_SESSION["password"] = $password ;

            header("Location: inventory.php");
            exit();
        }else{
            $error = '<div class="alert alert-danger">Invalid Login</div>';
        }
        }
       
        // if(isset($_SESSION["host_id"])) {
        // header("Location:inventory.php");

        // }
    // if(isset($_POST['email'],$_POST['password'])){
 
    //     $email = $_POST['username'];
    //     $password = $_POST['password'];

    //     if($email == $row['email'] && $password == $row['password']){
            
               
    //             $_SESSION["username"] = "demo" ;
    //             $_SESSION["password"] = "demo" ;

    //         header("Location: dashbord.html");
    //         exit();
    //     }else{
    //         $error = '<div class="alert alert-danger">Invalid Login</div>';
    //     }
    // }
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
    <!-- Bootstrap -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!-- styles -->
    <link href="css/styles.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
  </head>
  <body class="login-bg">
    <div class="header">
         <div class="container">
            <div class="row">
               <div class="col-md-12">
                  <!-- Logo -->
                  <div class="logo">
                     <h1><a href="index.html">User login</a></h1>
                  </div>
               </div>
            </div>
         </div>
    </div>

    <div class="page-content container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-wrapper">
                    <div class="box">
                        <div class="content-wrap">
                        <?php echo $error; ?>
                       <form accept-charset="UTF-8" role="form" method="post" action="">
                       <h6>Sign In</h6>
                        <fieldset>
                            <div class="form-group">
                                <input class="form-control" placeholder="Email" required name="email" type="email">
                            </div>
                            <div class="form-group">
                                <input class="form-control" placeholder="Password" required name="password" type="password" value="">
                            </div>
                                <input class="btn btn-lg btn-success btn-block" type="submit" value="Login">
                        </fieldset>
                    </form> 
                        </div>
                    </div>

                   
                </div>
            </div>
        </div>
    </div>



    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://code.jquery.com/jquery.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="js/custom.js"></script>
  </body>
</html>