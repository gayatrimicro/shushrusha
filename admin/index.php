<?php
    session_start();
    $error = "";

    if(isset($_POST['username'],$_POST['password'])){
 
        /*** You can change username & password ***/
        $user = array(
                        "user" => "admin",
                        "pass"=>"shrushu@18"          
                );
        $username = $_POST['username'];
        $pass = $_POST['password'];
        if($username == $user['user'] && $pass == $user['pass']){
            
               
                $_SESSION["username"] = "admin" ;
                $_SESSION["password"] = "admin+123" ;

            header("Location: specialities/");
            exit();
        }else{
            $error = '<div class="alert alert-danger">Invalid Login</div>';
        }
    }
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
                     <h1><a href="index.html">Admin Panel</a></h1>
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
                                <input class="form-control" placeholder="Username" name="username" type="text">
                            </div>
                            <div class="form-group">
                                <input class="form-control" placeholder="Password" name="password" type="password" value="">
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