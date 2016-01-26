<?php

function check_verify($code, $id = ''){
    $verify = new \Think\Verify();
    return $verify->check($code, $id);
}
function isLogin(){
	return session('?user_name') || cookie('user_name') ? true : false; 
}
function encryption(){
	
}