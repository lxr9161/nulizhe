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
		$field = 'task_id,task_user_id,task_status,task_is_remind,task_limit_time,task_property,task_content,task_reward,task_punish,task_create_time';
		$toDo = $this->task->field($field)->where(array('task_status'=>0,'task_user_id'=>get_user_info()['user_id']))->order('task_create_time DESC')->limit(0,6)->select();
		$doing = $this->task->field($field)->where(array('task_status'=>1,'task_user_id'=>get_user_info()['user_id']))->order('task_start_time DESC')->select();
		$done = $this->task->field($field)->where(array('task_status'=>2,'task_user_id'=>get_user_info()['user_id']))->order('task_close_time DESC')->limit(0,6)->select();
		$this->assign('toDo',$toDo);
		$this->assign('doing',$doing);
		$this->assign('done',$done);
		$this->display();
	}
	public function addTask(){
		if(get_user_info() && IS_POST){
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
			if($data['task_limit_time'] == ''){
				$data['task_limit_time'] = '0000-00-00 00:00:00';
			}
			if(!$task->validate($rules)->create()){
				$this->ajaxReturn(ajax_return_info('error',$task->getError()));
			}else{
				
				$result = $task->add($data);
				if($result){
					$this->ajaxReturn(array('status'=>'success','currentId'=> $result,'Info'=>'新建成功','time'=>$data['task_create_time']));
				}else{
					$this->ajaxReturn(ajax_return_info('error','创建失败，请重试'));
				}
			}
		}else{
			$this->ajaxReturn(array('status'=>'login','/user/logout'));
		}
	}
	public function addRules(){
		$content = I('get.content','');
		$id = I('get.task_id',0,'intval');
		$rule = I('get.rule','');
		if(!empty($content) && !empty($id)){
			switch ($rule) {
				case 'reward':
					$this->task->where('task_id='.$id)->save(array('task_reward'=>$content)) ? $this->ajaxReturn(array('status'=>'success','Info'=>'保存成功')) : $this->ajaxReturn(array('status'=>'error','Info'=>'保存失败，请重试'));
					break;
				case 'punish':
					$this->task->where('task_id='.$id)->save(array('task_punish'=>$content)) ? $this->ajaxReturn(array('status'=>'success','Info'=>'保存成功')) : $this->ajaxReturn(array('status'=>'error','Info'=>'保存失败，请重试'));
					break;
				default:
					$this->ajaxReturn(array('status'=>'error','Info'=>'添加失败'));
					break;
			}
		}else{
			$this->ajaxReturn(array('status'=>'error','Info'=>'添加失败'));
		}
		
	}
	public function updateTask(){
		$id = I('post.task_id',0,'intval');
		if(!empty($id)){
			$data['task_content'] = I('post.task_content');
			$data['task_property'] = I('post.task_property');
			$data['task_is_remind'] = I('post.task_is_remind');
			$data['task_reward'] = I('post.task_reward');
			$data['task_punish'] = I('post.task_punish');
			$data['task_limit_time'] = I('post.task_limit_time');
			$this->task->where('task_id='.$id)->save($data) ? $this->ajaxReturn(ajax_return_info('success','修改成功')) : $this->ajaxReturn(ajax_return_info('error','数据并没有改变，修改失败'));
		}else{
			$this->ajaxReturn(ajax_return_info('error','错误'));
		}
	}
	public function deleteTask(){
		$id = I('get.id',0,'intval');
		if(!empty($id)){
			$this->task->where('task_id='.$id)->delete() ? $this->ajaxReturn(ajax_return_info('success','删除成功')) : $this->ajaxReturn(ajax_return_info('error','删除失败'));
		}else{
			$this->ajaxReturn(ajax_return_info('error','对不起，出错了，请重试'));
		}
	}
	public function ajaxGetTaskModel(){
		$id = I('get.id',0,'intval');
		$t = $this->fetch('Task:part:create_task');
		if(empty($id)){
			$this->ajaxReturn(array('tpl'=>$t,'data'=>null),'JSON',JSON_UNESCAPED_UNICODE);
		}else{
			$d = $this->task->where('task_id='.$id)->find();
			$this->ajaxReturn(array('tpl'=>$t,'data'=>$d));
		}
	}
	public function startTask(){
		$id = I('get.id',0,'intval');
		if(!empty($id)){
			$startTime = date('Y-m-d H:i:s',time());
			$this->task->where('task_id='.$id)->save(array('task_status'=>1,'task_start_time'=>$startTime)) ? $this->ajaxReturn(array('status'=>'success','Info'=>'开始干活咯')) : $this->ajaxReturn(array('status'=>'error','Info'=>'错误，请重试'));
		}else{
			$this->ajaxReturn(array('status'=>'error','Info'=>'错误，请重试'));
		}
	}
	public function finishTask(){
		$id = I('get.id',0,'intval');
		if(!empty($id)){
			$finishTime = date('Y-m-d H:i:s',time());
			$this->task->where('task_id='.$id)->save(array('task_status'=>2,'task_close_time'=>$finishTime)) ? $this->ajaxReturn(ajax_return_info('success','很棒哦，任务完成了')) : $this->ajaxReturn(ajax_return_info('error','错误，请重试'));
		}else{
			$this->ajaxReturn(ajax_return_info('error','错误，请重试'));
		}
	}
	public function getTask(){
		$id = I('get.id',0,'intval');
		if(!empty($id)){
			$task = $this->task->field('task_id,task_property,task_is_remind,task_content,task_reward,task_punish,task_limit_time')->where('task_id='.$id)->find();
			$this->ajaxReturn(ajax_return_info('success',$task));
		}else{
			$this->ajaxReturn(ajax_return_info('error','任务不存在'));
		}
	} 
	public function ajaxLoadTask(){
		$status = I('get.status');
		$count = I('get.count');

		if(isset($status) && !empty($count)){	
			$item = $this->fetch('Task:part:task_item');
			$task = $this->task->where(array('task_status'=>$status,'task_user_id'=>get_user_info()['user_id']))->order('task_create_time DESC')->limit($count,6)->select();
			$this->ajaxReturn(array('tpl'=>$item,'data'=>$task));
		}else{
			$this->ajaxReturn(ajax_return_info('error','操作错误'));
		}
	}
}


?>