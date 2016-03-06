<?php
namespace Home\Controller;
use Think\Controller;
/**
* 
*/
class TaskController extends Controller
{
	public function index(){
		$this->display();
	}
	public function addTask(){
		var_dump($_POST);
	}
}


?>