<?php
namespace Admin\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
    	echo 'Admin';
    }
    public function hehe($nihao){
    	echo '我是后台模块'.$nihao;
    }
}