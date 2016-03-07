<?php
namespace Home\Controller;
use Think\Controller;
/**
* 
*/
class TaskController extends Controller
{
	protected $task;
	public function __construct(){
		parent::__construct();
		$this->task = M('task');
	}
	public function index(){
		$field = 'task_id,task_user_id,task_status,task_limit_time,task_property,task_content,task_reward,task_punish';
		$toDo = $this->task->field($field)->where('task_status=0')->order('task_property DESC,task_create_time DESC')->select();
		$this->assign('toDo',$toDo);
		$this->display();
	}
	public function addTask(){
		if(get_user_info()){
			$task = $this->task;
			$rules = array(
					array('task_content','require','任务不能为空'),
					array('task_content','0,50','长度不能大于50位',0,'length'),
					array('task_reward','0,30','奖励长度不能大于30位',2,'length'),
					array('task_punish','0,30','惩罚长度不能大小30位',2,'length')
				);
			$data = $task->create();
			$data['task_create_time'] = date('Y-m-d H:i:s');
			$data['task_user_id'] = get_user_info()['user_id'];
			if(!$task->validate($rules)->create()){
				exit($task->getError());
			}else{
				$task->add($data) ? $this->success('添加成功','/task') : $this->error('添加失败');
			}
		}else{

			$this->error('用户不存在','/user/logout');
		}	
	}
	public function addReward(){
		$reward = I('get.reward','');
		$id = I('get.task_id',0,'intval');
		if(!empty($reward) && !empty($id)){
			$this->task->where('task_id='.$id)->save(array('task_reward'=>$reward)) ? $this->ajaxReturn(array('status'=>'success','Info'=>'保存成功')) : $this->ajaxReturn(array('status'=>'error','Info'=>'保存失败，请重试'));
		}else{
			$this->ajaxReturn(array('status'=>'error','Info'=>'添加失败'));
		}
	}
	public function addPunish(){

	}
}


?>