<?php
namespace Home\Controller;
use Think\Controller;

/**
* 用户资料
*/
class UserDetailsController extends Controller
{
	
	public function index(){
		$this->display('details');
	}
}