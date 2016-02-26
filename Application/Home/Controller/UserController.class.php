<?php

namespace Home\Controller;
use Think\Controller;

/**
* 
*/
class UserController extends Controller
{	
	protected $user;
	protected $picture;

	public function __construct(){
		parent::__construct();
		$this->user = M('user');
		$this->picture = M('picture');
	}
    public function index(){
    	if(isLogin()){
    		$username = session('user_name') ? session('user_name') : cookie('user_name');
    		$field = 'user_id,user_nickname,user_name,user_avater,user_sign,user_birthday,user_sex,user_description,user_signature,user_addr';
    		$where['user_name'] = $username;
    		$userCenter = $this->user->field($field)->where($where)->find();
    		$this->assign('user',$userCenter);
    		$this->assign('picList',$this->_getPic($userCenter['user_id']));
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
		if(isLogin() && IS_POST ){
			$upload = new \Think\Upload();// 实例化上传类
		    $upload->maxSize   =     3145728 ;// 设置附件上传大小
		    $upload->exts      =     array('jpg', 'png', 'gif', 'jpeg');// 设置附件上传类型
		    $upload->rootPath  =     './Uploads/'; // 设置附件上传根目录
		    $upload->savePath  =     'tempic/'; // 设置附件上传（子）目录
		    $upload->subName   =     '';

		    // 上传文件 
		    $info   =   $upload->upload();
		    if(!$info) {// 上传错误提示错误信息
		        echo json_encode(array('status' => 'error','Info' => $upload->getError()));
		        exit();
		    }else{// 上传成功
		    	echo json_encode($info);
		    	exit();
		    }
		}else{
			$this->error('error','/user');
		}
			
	}
	public function imgCrop(){
		if(isLogin()){
			if(IS_POST && !empty($_POST['imgSrc'])){
				if(mb_strlen($_POST['picWords'],'utf-8') > 40){
					$this->ajaxReturn(array('status'=>'error','errorType'=>'length','Info'=>'图片描述大于40个字。'));
				};
				if($_POST['postStatus'] == 0){
					$startX = (int)round($_POST['pw'] / $_POST['cw'] * $_POST['x']);
					$startY = (int)round($_POST['ph'] / $_POST['ch'] * $_POST['y']);
					$pw = $_POST['pw'];
					$ph = $_POST['ph'];
					$user = session('user_name') ? session('user_name') : cookie('user_name');
					$picName = time().'.jpg';
					is_dir('./Uploads/pic/'.$user) ? ture : mkdir('./Uploads/pic/'.$user);
					$targ_w = $targ_h = 182;
					$jpeg_quality = 90;
					$src = '.'.$_POST['imgSrc'];
					$imgSize = getimagesize($src);
					switch ($imgSize['mime']) {
						case 'image/jpeg':
								$img_r = imagecreatefromjpeg($src);
							break;
						case 'image/png':
								$img_r = imagecreatefrompng($src);
							break;
						case 'image/gif':
								$img_r = imagecreatefromgif($src);
							break;
						default:
							$this->ajaxReturn(array('status'=>'error','errorType'=>'extensions','Info'=>'图片格式错误。'));
							break;
					}
					$dst_r = ImageCreateTrueColor(182,182);
					$cropImg = ImageCreateTrueColor($_POST['pw'],$_POST['ph']);
					imagecopyresampled($cropImg, $img_r, 0, 0, 0,0 ,$_POST['pw'],$_POST['ph'], $imgSize[0], $imgSize[1]);
					imagecopy($dst_r, $cropImg, 0, 0, $startX, $startY, 182, 182);
					imagejpeg($dst_r,'./Uploads/pic/'.$user.'/'.$picName,$jpeg_quality);
					imagedestroy($dst_r);
					imagedestroy($cropImg);
					imagedestroy($img_r);
					if(file_exists('./Uploads/pic/'.$user.'/'.$picName)) {
						$picData['pic_create_date'] = date('Y-m-d H:i:s',time());
						$picData['pic_path'] = './Uploads/pic/'.$user.'/'.$picName;
						$picData['pic_user'] = $user;
						$picData['pic_words'] = $_POST['picWords'];
						$picData['pic_user_id'] = $_POST['picUserId'];
						$this->picture->add($picData) ? $this->ajaxReturn(array('status'=>'success','Info'=>'图片保存成功。','picInfo'=>$picData)) : $this->ajaxReturn(array('status'=>'error','errorType'=>'saveFail','Info'=>'图片保存失败，请重试！'));

					}else{
						$this->ajaxReturn(array('status'=>'error','errorType'=>'missImage','Info'=>'图片已丢失。'));
					}
				}else{
					$this->ajaxReturn(array('status'=>'error','errorType'=>'RepeatUpload','Info'=>'请重新选择图片。'));
				}
			}else{
				$this->ajaxReturn(array('status'=>'error','errorType'=>'NotUploaded','Info'=>'请选择图片。'));
			}
		}else{
			$this->error('请先登录','/login');
		}
	}
	public function details(){
		$this->display('details');
	}
	public function updateAvatar(){
		$this->display('update_avatar');
	}
	public function saveAvatar(){
		if(isLogin()){
			if(IS_POST && !empty($_POST['imgSrc'])){
				if($_POST['postStatus'] == 0){
					$user = session('user_name') ? session('user_name') : cookie('user_name');
					$avatar = cropImage($_POST['imgSrc'],$_POST['pw'],$_POST['ph'],$_POST['cw'],$_POST['ch'],$_POST['x'],$_POST['y'],100,100,'avatar',null,$user);
					$avatarMini = cropImage($_POST['imgSrc'],$_POST['miniw'],$_POST['minih'],$_POST['cw'],$_POST['ch'],$_POST['x'],$_POST['y'],60,90,'avatar',null,$user.'-mini');
					if($avatar == true && $avatarMini == true){
						$this->ajaxReturn(array('status'=>'success','Info'=>'图片保存成功。','picInfo'=>$picData));
					}else{
						$this->ajaxReturn(array('status'=>'error','errorType'=>'missImage','Info'=>'图片已丢失。请重试'));
					}
				}else{
					$this->ajaxReturn(array('status'=>'error','errorType'=>'RepeatUpload','Info'=>'请重新选择图片。'));
				}
			}else{
				$this->ajaxReturn(array('status'=>'error','errorType'=>'NotUploaded','Info'=>'请选择图片。'));
			}
		}else{
			$this->error('请先登录','/login');
		}
	}
	private function _getPic($userId){
		$field = 'pic_id,pic_path,pic_user,pic_user_id,pic_words';
		$where['pic_user_id'] = $userId;
		$picList = $this->picture->field($field)->where($where)->order('pic_create_date DESC')->select();
		return $picList;
	}
}



?>