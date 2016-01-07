<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
		/*echo '1123';
		//mkdir('./Live');
		//rmdir('./Live');
		$new = array('name'=>'dalong','age'=>18,'nihao'=>'hi');
		$old = array(array('name'=>'liuxiaorong','age'=>16,'nihao'=>'hello'));
	    array_push($old,$new);
	    //krsort ($old);
		var_dump($old);
		
		
		echo '<hr />';
	
	
	  	$old = json_encode($old);

	   	var_dump(json_decode($old));
	   	$d = json_decode($old);
	   	echo $d->name->name;
	   	echo $d->{1}->name;
	   	$c = json_decode($old,TRUE );
	   	$length = count($c);
	   	var_dump($c);
	   	file_put_contents('./Live/1234.josn', $old);
	   		echo filesize('./Live/1234.josn');

	   */
	  	
	   	//echo file_exists('./Public/1.xml');
	   	$xml = simplexml_load_file('./Public/1.xml');
	   	$num = count($xml->DataItems);
	   	var_dump($xml);
	   	foreach ($xml->DataItems as $value) {
	   		//echo $key.'->'.$value.'<br/>';
	   		echo $value->CreateTime;
	   		echo $value->Content;
	   	}
	}
}