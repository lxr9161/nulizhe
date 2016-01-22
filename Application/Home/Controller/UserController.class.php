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
		$this->user = D('user');
	}
    public function index(){
		$this->display('');
	}

	public function login(){
		$this->display('login');
	}

	public function loginPost(){
		if(IS_POST){
			
		}
	}

	public function register(){
		$this->display('register');
	}
	public function registerPost(){
		if(IS_POST){
			$data['user_name'] = $_POST['user_name'];
			$data['user_password'] = sha1($_POST['user_password']);
			$data['user_password_ok'] = sha1($_POST['user_password_ok']);
			$data['user_create_time'] = date('Y-m-d H:i:s',time());
			$data['user_last_login_time'] = $data['user_create_time'];
			$data['user_last_login_ip'] = $_SERVER['REMOTE_ADDR'];
			if(!$this->user->create()){

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