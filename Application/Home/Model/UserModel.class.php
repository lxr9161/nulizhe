<?php
namespace Home\Model;
use Think\Model;

/**
* 
*/
class UserModel extends Model
{
	protected $_validate = array(
		//array('verify','require','验证码不能为空'),
		array('agree','')
		array('user_name','require','用户名不能为空'),
		array('user_name','/^[^\s]*$/','用户名不能包含空格',0,'regex'),
		array('user_name','5,25','用户名长度不能小于5字符或大于25字符',0,'length'),
		array('user_name','','该用户名已存在',0,'unique',1),
		array('user_password','require','密码不能为空'),
		array('user_password','6,30','密码长度不能小于6位或大于30位','length'),
		array('user_password_ok','user_password','两次输入的密码不一致',0,'confirm'),
	);
}