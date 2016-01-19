<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh-CN">
<!--[if lt IE 7]>      <html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html> <!--<![endif]-->
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
	<meta name="renderer" content="webkit">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<meta name="keywords" content="nulizhe,努力" />
    <meta name="description" content="nulizhe.com" />
	<meta name="renderer" content="webkit">
	<link href="./favicon.ico" rel="icon" type="image/x-icon" />
	<link rel="stylesheet" type="text/css" href="./Public/libs/bootstrap/css/bootstrap.min.css"/>
	<!--[if lt IE 9]>
    <script src=""></script>
    <script src=""></script>
 	<![endif]-->
	<title>首页</title>

</head>
<body>
	<nav class="navbar navbar-default">
	  <div class="container-fluid">
	    <!-- Brand and toggle get grouped for better mobile display -->
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
	      <a class="navbar-brand" href="#">Brand</a>
	    </div>

	    <!-- Collect the nav links, forms, and other content for toggling -->
	    <div  class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	      <ul style="padding-left: 30px;" class="nav navbar-nav">
	        <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
	        <li><a href="#">Link</a></li>
	        <li class="dropdown">
	          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
	          <ul class="dropdown-menu">
	            <li><a href="#">Action</a></li>
	            <li><a href="#">Another action</a></li>
	            <li><a href="#">Something else here</a></li>
	            <li role="separator" class="divider"></li>
	            <li><a href="#">Separated link</a></li>
	            <li role="separator" class="divider"></li>
	            <li><a href="#">One more separated link</a></li>
	          </ul>
	        </li>
	      </ul>
	      <ul class="nav navbar-nav navbar-right">
	        <li><a href="#">Link</a></li>
	        <li class="dropdown">
	          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
	          <ul class="dropdown-menu">
	            <li><a href="#">Action</a></li>
	            <li><a href="#">Another action</a></li>
	            <li><a href="#">Something else here</a></li>
	            <li role="separator" class="divider"></li>
	            <li><a href="#">Separated link</a></li>
	          </ul>
	        </li>
	      </ul>
	      <form class="navbar-form navbar-right" role="search">
	        <div class="form-group">
	          <input type="text" class="form-control" placeholder="Search">
	        </div>
	        <button type="submit" class="btn btn-default">Submit</button>
	      </form>
	    </div><!-- /.navbar-collapse -->
	  </div><!-- /.container-fluid -->
	</nav>
	
	<div class="container">
		<div class="row">
			<div class="col-md-9">
				<div class="pull-left" style="margin-right: 15px;">
					<div class="" style="height: 320px;width: 270px;background-color: black;">
						<img src="<?php echo IMAGE_PATH;?>1.png">
					</div>
				</div>
				<div class="pull-left" style="margin-right: 15px;">
					<div class="" style="height: 320px;width: 270px;background-color: black;">
						<img src="<?php echo IMAGE_PATH;?>1.png">
					</div>
				</div>
				<div class="pull-left" style="margin-right: 15px;">
					<div class="" style="height: 320px;width: 270px;background-color: black;">
						<img src="<?php echo IMAGE_PATH;?>1.png">
					</div>
				</div>
			</div>
			<div class="col-md-2">
				
			</div>
		</div>
	</div>

	<script type="text/javascript" src="./Public/libs/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="./Public/libs/bootstrap/js/bootstrap.min.js"></script>
</body>
</html>