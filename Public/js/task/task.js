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
		$task_id = $(this).parents('.task-item').data('task');
		$reward = $(this).prevAll('.reward-text').val();
		/*$(this).parent().hide();
		$(this).parent().prev().show();*/
		$.get('/task/addReward',{reward:$reward,task_id:$task_id},function(data){
			console.log(data);
		})
		
	});
});