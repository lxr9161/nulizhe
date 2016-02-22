<?php
return array(
	//'配置项'=>'配置值'
	//'VAR_ADDON' => 'plugin',
	'TMPL_TEMPLATE_SUFFIX' => '.html',
	//'SHOW_PAGE_TRACE' =>true, 
	/*'TMPL_PARSE_STRING' => array(
		
		'__LIBS__' => '/Public/libs/',
		'__IMAGES__' => '/Public/images/',
		'__JS__' => '/Public/js/',
		'__CSS__' => '/Public/css/'
	),*/
	'URL_MODEL' => 1,
	'MODULE_ALLOW_LIST'    =>    array('Home','Admin','Tool'),
	'DEFAULT_MODULE' => 'Home',
	'URL_ROUTER_ON'			=> true,
	'URL_ROUTE_RULES' 		=> array(
		'login' => 'Home/User/login',
		'register' => 'Home/User/register',
		'details' =>'Home/User/details',
	),
	//数据库配置
	/*'DB_TYPE' => 'pdo',
	'DB_USER' => 'root',
	'DB_PWD' => '123456',
	'DB_PREFIX' => 'nu_',
	'DB_DSN' => 'mysql:host=127.0.0.1;dbname=nulizhe;charset=utf8',*/
	'DB_TYPE'   => 'mysql', // 数据库类型
	'DB_HOST'   => 'localhost', // 服务器地址
	'DB_NAME'   => 'nulizhe', // 数据库名
	'DB_USER'   => 'root', // 用户名
	'DB_PWD'    => '123456', // 密码
	'DB_PORT'   => 3306, // 端口
	'DB_PREFIX' => 'nl_', // 数据库表前缀 
	'DB_CHARSET'=> 'utf8', // 字符集
	'DB_DEBUG'  =>  TRUE, // 数据库调试模式 开启后可以记录SQL日志 3.2.3新增
	);