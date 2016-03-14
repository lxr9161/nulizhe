$(function(){
	$('.task-model').on('click','.add-rules',function(){
		$('.rules').toggle();
	});
	$('.btn-task-a').click(function(){
		$.get('task/ajax_get_task_model',function(data){
			$('.task-model').html(data.tpl);
			$('.update-task').hide().attr('disabled','disabled');
			$('.new-task').show().attr('disabled',false);
			$(".choose-time").DateTimePicker({		
				language:'zh-CN',
				defaultDate: new Date(),
				animationDuration:200,
				buttonsToDisplay: [ "SetButton", "ClearButton"],
				clearButtonContent: "取消",
			});
			$('#myModal').modal('show');
		});
	});
	$('.task-model').on('click','.new-task',function(){
		var serialize = $('.add-task').serializeArray();
		$.post('task/addTask',serialize,function(data){
			switch(data.status){
				case 'success':
					var arr = new Array(),
						propertyClass;
					$('.add-task')[0].reset();
					$('#myModal').modal('hide');
					for(i in serialize){
						arr[serialize[i].name] = serialize[i].value;
					}
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
					var r = ruleContent('reward','奖励','奖励是什么',arr['task_reward']);
					var p = ruleContent('punish','惩罚','惩罚是什么',arr['task_punish']);
					var a = '<a href="javascript:;" class="js-more">查看更多</a> ';
						a += '<a href="javascript:;" class="js-update action-display"><sapn class="glyphicon glyphicon-edit"></sapn> 修改</a> '
						a += '<a href="javascript:;" class="js-delete action-display"><span class="glyphicon glyphicon-trash"></span> 删除</a> ';
						a += '<a href="javascript:;" class="btn btn-default btn-xs pull-right start-task">开始任务</a>';
					var item = $('<div class="task-item" data-task="'+ data.currentId +'">'),
						property = $('<a href="javascript:;" class="task-property">'),
						border = $('<div class="task-border">'),
						limit = $('<div class="task-limit-time">'),
						more = $('<div class="task-more">'),
						action = $('<div class="task-action">').html(a),
						moreInfo = $('<div class="more-info">').html(r+p);
						taskMore = more.append(action).append(moreInfo);
					property.addClass(propertyClass).attr('data-property',data.currentId);
					border.append('<p class="task-content">'+ arr['task_content'] +'</p>');
					if(arr['task_limit_time'] != ''){
						limit.append('<p>最后完成时间:'+ arr['task_limit_time'] +'</p>');
					}
					var task = item.append(property).append(border).append(limit).append(taskMore);
					$('.to-do').prepend(task);
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
	$('.task-model').on('click','.update-task',function(){
		var id = $(this).attr('data-task');
		serializeArray = $('.add-task').serializeArray();
		var data = {};
			for(i in serializeArray){
					data[serializeArray[i].name] = serializeArray[i].value;
			}
			data['task_id'] = id;
		$.post('/task/updateTask',data,function(data){
			if(data.status == 'success'){
				window.location.reload();
			}else{
				alert(data.Info);
			}
		});
	});
	$('.task-model').on('click','.js-reward',function(){
		$(this).parent().addClass('active');
		$('.js-punish').parent().removeClass('active');
		$('.punish-rule').hide();
		$('.reward-rule').show();
	});

	$('.task-model').on('click','.js-punish',function(){
		$(this).parent().addClass('active');
		$('.js-reward').parent().removeClass('active');
		$('.reward-rule').hide();
		$('.punish-rule').show();
	});
	$('.task-list').on('click','.js-more',function(){
		$(this).parent().next('.more-info').slideToggle();
	});
	$('.task-list').on('click','.btn-add',function(){
		$(this).next().show();
		$(this).hide();
	});
	$('.task-list').on('click','.btn-send',function(){
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
	})
	$('.to-do').on('click','.start-task',function(){
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
	$('.doing').on('click','.finish-task',function(){
		var that = $(this),
			id = that.parents('.task-item').data('task');	
		$.get('/task/finishTask',{id:id},function(data){
			if(data.status == 'success') {
				that.parents('.task-item').prependTo('.done');
				that.parent().append('<a href="javascript:;" class="btn btn-default btn-xs pull-right end-task disabled">已完成</a>');
				that.parent().children('.js-update').remove();
				that.remove();
			}else{
				alert(data.Info);
			}
		});
	});
	$('.task-list').on('click','.js-update',function(){
		var id = $(this).parents('.task-item').data('task');
		$.get('/task/ajax_get_task_model',{id:id},function(data){
			$('.task-model').html(data.tpl);
			$('.new-task').hide().attr('disabled','disabled');
			$('.update-task').show().attr('disabled',false);
			$('#task-content').val(data.data.task_content);
			data.data.task_is_remind != 0 ? $('#remind').attr('checked','checked') : $('#remind').attr('checked',false);
			if(data.data.task_limit_time != '0000-00-00 00:00:00')$('#limit-time').val(data.data.task_limit_time);
			$('input[name=task_property]').each(function(){
				if($(this).val() == data.data.task_property){
					$(this).attr('checked','checked');
				}else{
					$(this).attr("checked",false);
				}
			});
			$('#task-reward').val(data.data.task_reward);
			$('#task-punish').val(data.data.task_punish);
			$('.update-task').attr('data-task',data.data.task_id);
			$(".choose-time").DateTimePicker({		
				language:'zh-CN',
				defaultDate: new Date(),
				animationDuration:200,
				buttonsToDisplay: [ "SetButton", "ClearButton"],
				clearButtonContent: "取消",
			});
		  	$('.monitor-length').each(function(){
		        var that = $(this),
		            shwoWords = that.next('.show-length'),
		            w = shwoWords.find('.words-length'),
		            wordsLength = that.val().length,
		            maxLength = shwoWords.data('length');
	        	w.html(maxLength-wordsLength);
	   		});
			$('#myModal').modal('show');
		});
	});

	$('.task-item').on('click','.js-delete',function(){
		if(confirm('是否删除')){
			var i = $(this).parents('.task-item').data('task');
			$.get('task/deleteTask',{id:i},function(){
				
			},'JSON');
		}
		

	});
	function ruleContent(type,title,placeholder,content){
		var c = '<div>';
			c += '<h5><b>'+ title +'</b></h5>';
			c += '<div class="rules-container">';
		if(content == ''){
			c += '<a href="javascript:;" class="btn-add">添加</a>';
			c += '<div class="rules-box reward">';
			c += '<textarea class="monitor-length rule-text" maxlength="30" placeholder="'+ placeholder +'"></textarea>';
			c += '<p class="show-length" data-length = "30">最多只能输入 (<span class="words-length">30</span>) 30个字哦</p>';
			c += '<button type="button" class="btn btn-default btn-xs btn-send" data-rule="'+ type +'">保存</button>';
			c += '</div>';
		}else{
			c += '<p>'+ content +'</p>';
		}
			c += '</div></div>';
		return c;
	}
});