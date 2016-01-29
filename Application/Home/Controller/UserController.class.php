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
    	if(isLogin()){
    		$this->display();
    	}else{
    		header('Location:/login');
    	}
	}
	public function logout(){
		session('user_name',null);
		cookie('user_name',null);
		if(session('user_name') == null and cookie('user_name') == null){
			$this->success('退出成功','/login');
		}
	}
	public function login(){
		if(isLogin()){
			$this->success('你已经登录了','/user');
		}else{
			$this->display('login');
		}
	}

	public function loginPost(){
		if(IS_POST){
			if(session('error_count') > 2){
				if(!check_verify($_POST['checkvode'],$id = '')){
					exit('验证码不正确');
				}
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
					session('user_name',$_POST['user_name']);
					cookie('user_name',$_POST['user_name'],'expire=2592000');
					session('error_count',null);
					header('Location:/user');
				}else{
					if(session('error_count')){
						$error_count = session('error_count') + 1;
						session('error_count',$error_count);
					}else{
						session('error_count',1);
					}
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
			if(!check_verify($_POST['checkvode'],$id = '')){
				exit('验证码不正确');
			}	
			$rule = array(
				array('agree','1','请同意服务条款',1,'equal'),
				array('user_name','require','用户名不能为空'),
				array('user_name','/^([A-Za-z0-9_])+$/','用户名格式不正确',0,'regex'),
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
					session('user_name',$_POST['user_name']);
					$this->success('注册成功','/user');
				}else{
					$this->error('注册失败','/register');
				}
			}	
			
		}
	}
	public function upload(){
		$upload = new \Think\Upload();// 实例化上传类
	    $upload->maxSize   =     3145728 ;// 设置附件上传大小
	    $upload->exts      =     array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
	    $upload->rootPath  =     './Uploads/'; // 设置附件上传根目录
	    $upload->savePath  =     'tempic/'; // 设置附件上传（子）目录
	    $upload->subName   =     '';

	    // 上传文件 
	    $info   =   $upload->upload();
	    if(!$info) {// 上传错误提示错误信息
	        $this->error($upload->getError());
	    }else{// 上传成功
	    	echo json_encode($info);
	    }
	}
}



?>