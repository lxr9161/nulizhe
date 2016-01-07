<?php

namespace Home\Controller;
use Think\Controller;

/**
* 
*/
class UserController extends Controller
{
	public function index(){
		echo 'user'.'<br/>';
	}
	public function hello(){
		echo 'hello thinkphp';
	}
	public function one(){
		//$User = new \Admin\Controller\IndexController();
		$User = A('Admin/index');
		$User -> hehe();
	}
	/*public function _before_index(){
		echo 'before';
	}
	public function _after_index(){
		echo 'after';
	}*/
	public function two($year=2015,$mouth=01){
		echo 'year: '.$year.'mouth: '.$mouth;
	}
	public function three(){
		//$user = U('User/add',array('id'=>1,'name'=>'liuxiaorong'),'html');
		$user = U('Blog/read@blog.thinkphp.cn','id=1');;
		var_dump($user);
	}
	public function four(){
		$this->redirect('Admin/index/hehe', array('nihao' => 2), 3, '页面跳转中...');
	}
	public function five(){
		print_r(I());
		//echo $_GET['id'];
	}
	public function six(){
		echo I('path.1');
	}
	 public function _empty($name){
        //把所有城市的操作解析到city方法
        $this->city($name);
    }
    //注意 city方法 本身是 protected 方法
    protected function city($name){
        //和$name这个城市相关的处理
         echo '当前城市' . $name;
    }
    public function user(){
    	$array['name']    =    'thinkphp';
		$array['email']   =    'liu21st@gmail.com';
		$array['phone']   =    '12335678';
		$user['nickname'] = 'dalong';
		$user['age'] = 16;
		$hello = 'hello world';
		$this->assign($array);
		$this->assign('user',$user);
		$this->assign('hello',$hello);
    	$this->display('user');
    	echo T('');
    }
}



?>