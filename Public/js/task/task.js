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
	
	$('.new-task').on('click',function(){

		var serialize = $('.add-task').serializeArray();
		$.post('task/addTask',serialize,function(data){
			var arr = new Array(),
				propertyClass;
			for(i in serialize){
				arr[serialize[i].name] = serialize[i].value;
			}
			console.log(arr);
			switch(arr['task_property']){
				case '0':
					propertyClass = 'task-normal';
					break;
				case '1':
					propertyClass = 'task-urgent';
					break;
				case '2':
					propertyClass = 'task-important';
					break;
			}
			var id = 25;
			var item = $('<div class="task-item" data-task="'+ id +'">'),
				property = $('<a href="javascript" class="task-property">'),
				border = $('<div class="task-border">'),
				limit = $('<div class="task-limit-time">'),
				more = $('<div class="task-more">');
			property.addClass(propertyClass);
			border.append('<p class="task-content">'+ arr['task_content'] +'</p>');
			if(arr['task_limit_time'] != ''){
				limit.append('<p>最后完成时间:'+ arr['task_limit_time'] +'</p>');
			}
			console.log(item.append(property).append(border).append(limit));
			switch(data.status){
				case 'success':
					/*$('.add-task')[0].reset();
					$('#myModal').modal('hide');*/
					for(i in serialize){
						arr[serialize[i].name] = serialize[i].value;
					}

					break;
				case 'error':
					alert(data.Info);
					break;
				case 'login':
					alert('请先登录');
					window.location.href = data.Info;
			}
		})
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
	
	$('.task-action').on('click','.finish-task',function(){
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
		
		/*var id = $(this).parents('.task-item').data('task');
		$.get('/task/getTask',{id:id},function(data){
			console.log(data);
			$('#update-task').modal('toggle');
		});*/
	});
});