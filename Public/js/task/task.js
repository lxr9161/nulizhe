$(function(){
	/*$('.nihao').click(function(){
		$("#myModal").modal('show');
	});*/
	$('.add-rules').click(function(){
		$('.rules').toggle();
	});
	$('.btn-submit').click(function(){
		$('.add-task').submit();
	});
	$('.js-reward').click(function(){
		
			$(this).parent().addClass('active');
			$('.js-punish').parent().removeClass('active');
			$('.punish-rule').hide();
			$('.reward-rule').show();
		
	});
	$('.js-punish').click(function(){
		
			$(this).parent().addClass('active');
			$('.js-reward').parent().removeClass('active');
			$('.reward-rule').hide();
			$('.punish-rule').show();
		
	});
	$(".choose-time").DateTimePicker({		
		language:'zh-CN',
		defaultDate: new Date(),
		animationDuration:200,
		buttonsToDisplay: [ "SetButton", "ClearButton"],
		clearButtonContent: "取消",
	});
	
	$('.js-more').click(function(){
		$(this).parent().next('.more-info').slideToggle();
	});
	$('.btn-add').click(function(){
		$(this).next().show();
		$(this).hide();
	});
	$('.btn-send').click(function(){
		var that = $(this),
			$task_id = that.parents('.task-item').data('task'),
			$content = that.prevAll('.rule-text').val(),
			rule = that.data('rule');
		$.get('/task/addRules',{content:$content,task_id:$task_id,rule:rule},function(data){
			if(data.status == 'success'){
				that.parents('.rules-container').html('<p>'+ $content +'</p>');
				alert(data.Info);
			}else{
				alert(data.Info);
			}	
		})
	});
	$('.start-task').on('click',function(){
		var that = $(this),
			id = that.parents('.task-item').data('task');
			
		$.get('/task/startTask',{id:id},function(data){
			if(data.status == 'success'){
				that.parents('.task-item').prependTo('.doing');
				that.parent().append('<a href="javascript:;" class="btn btn-default btn-xs pull-right finish-task">任务完成</a>');
				that.remove();	
			}else{
				alert(data.Info);
			}
			
		});
	});
	
	$('.task-acion').on('click','.finish-task',function(){
		var that = $(this),
			id = that.parents('.task-item').data('task');
				
		$.get('/task/finishTask',{id:id},function(data){
			if(data.status == 'success') {
				that.parents('.task-item').prependTo('.done');
				that.parent().append('<a href="javascript:;" class="btn btn-default btn-xs pull-right end-task disabled">已完成</a>');
				that.remove();
			}else{
				alert(data.Info);
			}
		});
	});
	//$('[data-toggle="popover"]').popover();
	$('.js-update').on('click',function(){
		
		var id = $(this).parents('.task-item').data('task');
		$.get('/task/getTask',{id:id},function(data){
			console.log(data);
			$('#update-task').modal('toggle');
		});
	});
});