<?php

function check_verify($code, $id = ''){
    $verify = new \Think\Verify();
    return $verify->check($code, $id);
}
function isLogin(){
	return session('user_name') || cookie('user_name') ? true : false; 
}
function encryption(){
	
}

function get_now_user(){
	$user = session('user_name') ? session('user_name') : cookie('user_name');
	return $user;
}
/**获取当前用户信息**/
function get_user_info(){
	$user = session('user_name') ? session('user_name') : cookie('user_name');
	$d = M('user');
	$field = 'user_id,user_name,user_nickname,user_avatar,user_avatar_mini';
	$userInfo = $d->field($field)->where(array('user_name'=>$user))->find();
	return $userInfo;
}
/**ajax提交后返回的数据**/
function ajax_return_info($status,$info,$type=null){
	return array('status'=>$status,'Info'=>$info,'type'=>$type);
}
/*
*正方形图片裁剪函数
*
*/
function crop_image($img,$pw,$ph,$cw,$ch,$x,$y,$targ,$qualigy,$dir,$childdir = null,$filename = null){
	$startX = (int)round($pw / $cw * $x);
	$startY = (int)round($ph / $ch * $y);
	//
	if(isset($filename) && !empty($filename)){
		$picName = $filename.'.jpg';
	}else{
		$picName = time().'.jpg';
	}
	if(is_dir('./Uploads/'.$dir)){
		$d = './Uploads/'.$dir.'/';
		$path = '/Uploads/'.$dir.'/';
	}else{
		mkdir('./Uploads/'.$dir);
		$d = './Uploads/'.$dir.'/';
		$path = '/Uploads/'.$dir.'/';
	}
	if(isset($childdir) && !empty($childdir)){
		if(is_dir('./Uploads/'.$dir.'/'.$childdir)){
			$d = './Uploads/'.$dir.'/'.$childdir.'/';
			$path = '/Uploads/'.$dir.'/'.$childdir.'/';
		}else{
			mkdir('./Uploads/'.$dir.'/'.$childdir);
			$d = './Uploads/'.$dir.'/'.$childdir.'/';
			$path = '/Uploads/'.$dir.'/'.$childdir.'/';

		}
	}
	$jpeg_quality = $qualigy;
	$src = '.'.$img;
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
			return array('status'=>'error','errorType'=>'extensions','Info'=>'图片格式错误。');
			exit;
			break;
	}
	$dst_r = ImageCreateTrueColor($targ,$targ);
	$cropImg = ImageCreateTrueColor($pw,$ph);
	imagecopyresampled($cropImg, $img_r, 0, 0, 0,0 ,$pw,$ph, $imgSize[0], $imgSize[1]);
	imagecopy($dst_r, $cropImg, 0, 0, $startX, $startY, $targ, $targ);
	imagejpeg($dst_r,$d.$picName,$jpeg_quality);
	imagedestroy($dst_r);
	imagedestroy($cropImg);
	imagedestroy($img_r);
	if(file_exists($d.$picName)){
		return $path.$picName;
	}else {
		return false;
	}

}