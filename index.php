<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2014 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用入口文件

// 检测PHP环境
if(version_compare(PHP_VERSION,'5.3.0','<'))  die('require PHP > 5.3.0 !');

// 开启调试模式 建议开发阶段开启 部署阶段注释或者设为false
define('APP_DEBUG',True);

define('SITE_PATH', dirname(__FILE__)."/");

//web图片资源目录
define('IMAGES_PATH', '/Public/images/');
//js,css插件目录
define('LIBS_PATH','/Public/libs/');
//CSS目录
define('CSS_PATH','/Public/css/');
define('JS_PATH','/Public/js/');

// 定义应用目录
define('APP_PATH','./Application/');

define('RUNTIME_PATH','./Runtime/');


define('BUILD_DIR_SECURE', false);
// 引入ThinkPHP入口文件
require './ThinkPHP/ThinkPHP.php';

// 亲^_^ 后面不需要任何代码了 就是如此简单