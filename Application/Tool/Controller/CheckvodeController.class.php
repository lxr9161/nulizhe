<?php
namespace Tool\Controller;
use Think\Controller;
/**
* 
*/
class checkvodeController extends Controller  {
	public function index(){
		$Verify_config=array(
        	'fontSize' =>16,
       		'length' =>4,
            'useNoise' =>false,
            'imageW' => 120,
            'imageH' => 36,
            'useCurve' => false,
	    );
	    ob_clean();
	    $Verify = new \Think\Verify($Verify_config);
	    $Verify->entry();	
	}

}