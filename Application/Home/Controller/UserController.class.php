<?php

namespace Home\Controller;
use Think\Controller;

/**
* 
*/
class UserController extends Controller
{	
	protected $user;

	public function __construct(){
		parent::__construct();
		$this->user = M('user');
	}
    public function index(){
		$this->display('');
	}

	public function login(){
		$this->display('login');

	}

	public function loginPost(){
		if(IS_POST){
			if(!check_verify($_POST['checkvode'],$id = '')){
				exit('验证码不正确');
			}
			$rule = array(
				array('user_name','require','用户名不能为空'),
				array('user_password','require','密码不能为空'),
			);
			$where['user_name'] = $_POST['user_name'];
			$where['user_password'] = sha1($_POST['user_password']);
			if(!$this->user->validate($rule)->create()){
				exit($this->user->getError());
			}else{
				if($this->user->where($where)->find()){
					header('Location:/user');
				}else{
					$this->error('用户名或密码错误','/login');
				}
			}
		}
	}

	public function register(){
		$this->display('register');
	}
	public function registerPost(){
		if(IS_POST){
			$rule = array(
				array('agree','1','请同意服务条款',1,'equal'),
				array('user_name','require','用户名不能为空'),
				array('user_name','/^[^\s]*$/','用户名不能包含空格',0,'regex'),
				array('user_name','5,25','用户名长度不能小于5字符或大于25字符',0,'length'),
				array('user_name','','该用户名已存在',0,'unique',0),
				array('user_password','require','密码不能为空'),
				array('user_password','6,30','密码长度不能小于6位或大于30位',1,'length'),
				array('user_password_ok','user_password','两次输入的密码不一致',1,'confirm'),
			);
			$data['user_name'] = $_POST['user_name'];
			$data['user_password'] = sha1($_POST['user_password']);
			$data['user_password_ok'] = sha1($_POST['user_password_ok']);
			$data['user_create_time'] = date('Y-m-d H:i:s',time());
			$data['user_last_login_time'] = $data['user_create_time'];
			$data['user_last_login_ip'] = $_SERVER['REMOTE_ADDR'];
			if(!$this->user->validate($rule)->create()){
				exit($this->user->getError());
			}else{
				if($this->user->add($data)){
					$this->success('注册成功','/user');
				}else{
					$this->error('注册失败','/register');
				}
			}
			
		}
	}
}



?>