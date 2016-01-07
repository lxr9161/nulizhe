<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<p>Hello world!!!!!!!!!!</p>
	 <?php echo ($name); ?> [ <?php echo ($email); ?> <?php echo ($phone); ?> ]

	 <?php echo ((isset($user["nickname"]) && ($user["nickname"] !== ""))?($user["nickname"]):"nxixixixixi"); ?>
	 <br/>

	 <?php $__FOR_START_11963__=1;$__FOR_END_11963__=100;for($nihao=$__FOR_START_11963__;$nihao < $__FOR_END_11963__;$nihao+=10){ echo ($nihao); ?><br/><?php } ?>

	 <?php if(($hello) == "hello world"): ?>thinnkphp<?php else: ?>noeq<?php endif; ?>

	 <br/>
	 <?php if(defined("APP_DEBUG")): ?>NAME常量已经定义<?php endif; ?>
</body>
</html>