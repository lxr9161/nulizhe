$(function(){
	$('.task-model').on('click','.add-rules',function(){
		$('.rules').toggle();
	});
	$('.btn-task-a').click(function(){
		$.get('task/ajaxGetTaskModel',function(data){
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
		}).fail(function(){
			alert('对不起，系统出错。')
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
					var r = ruleContent('reward','奖励','奖励是什么',arr['task_reward'],'task-reward-info');
					var p = ruleContent('punish','惩罚','惩罚是什么',arr['task_punish'],'task-punish-info');
					var t = '<p class="task-create-time"><b>创建时间：</b><span>'+ data.time +'</span></p>';
					var ud = '<div class="task-ud">';
						ud += '<a href="javascript:;" class="js-update"><sapn class="glyphicon glyphicon-edit"></sapn> 修改</a>';
						ud += '<a href="javascritp:;" class="js-delete "><span class="glyphicon glyphicon-trash"></span> 删除</a></div>'
					var a = '<a href="javascript:;" class="js-more">查看更多</a> ';
						a += '<a href="javascript:;" class="btn btn-default btn-xs pull-right start-task">开始任务</a>';
					var item = $('<div class="task-item" data-task="'+ data.currentId +'" data-task-sort="'+ arr['task_property'] +'">'),
						property = $('<a href="javascript:;" class="task-property">'),
						border = $('<div class="task-border">'),
						limit = $('<div class="task-limit-time">'),
						more = $('<div class="task-more">'),
						action = $('<div class="task-action">').html(a),
						moreInfo = $('<div class="more-info">').html(t+r+p+ud);
						taskMore = more.append(action).append(moreInfo);
					property.addClass(propertyClass).attr('data-property',arr['task_property']);
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
	$('.task-list').on('click','.btn-cancel',function(){
		var that = $(this);
		that.parent('.rules-box').hide();
		that.parents('.rules-container').find('.btn-add').show();
		that.siblings('.rule-text').val('');
		var length = that.siblings('.show-length').data('length');
		that.siblings('.show-length').children('.words-length').html(length);
	})
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
				that.parents('.task-more').find('.js-update').remove();
				that.remove();
			}else{
				alert(data.Info);
			}
		});
	});
	$('.task-list').on('click','.js-update',function(){
		var id = $(this).parents('.task-item').data('task');
		$.get('/task/ajaxGetTaskModel',{id:id},function(data){
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
	$('.task-list').on('click','.js-delete',function(){
		var that = $(this);
		if(confirm('是否删除')){
			var i = that.parents('.task-item').data('task');
			$.get('task/deleteTask',{id:i},function(data){
				if(data.status == 'success'){
					that.parents('.task-item').remove();
					alert(data.Info);
				}else{
					alert(data.Info);
				}
			},'JSON').fail(function(){
				alert('对不起，系统出错。');
			});
		}
	});
	function ruleContent(type,title,placeholder,content,boxClass){
		var c = '<div class="'+ boxClass +'">';
			c += '<h5><b>'+ title +'</b></h5>';
			c += '<div class="rules-container">';
		if(content == ''){
			c += '<a href="javascript:;" class="btn-add">添加</a>';
			c += '<div class="rules-box reward">';
			c += '<textarea class="monitor-length rule-text" maxlength="30" placeholder="'+ placeholder +'"></textarea>';
			c += '<p class="show-length" data-length = "30"> (<span class="words-length">30</span>) 30个字哦</p>';
			c += '<button type="button" class="btn btn-default btn-xs btn-send" data-rule="'+ type +'">保存</button>';
			c += '<button type="button" class="btn btn-default btn-xs btn-cancel">取消</button>'
			c += '</div>';
		}else{
			c += '<p class="rule-content">'+ content +'</p>';
		}
			c += '</div></div>';
		return c;
	}
	$('.nav-to-do').click(function(){
		$('.tab-to-do').removeClass('task-hidden').addClass('task-show');
		$('.tab-doing').removeClass('task-show').addClass('task-hidden');
		$('.tab-done').removeClass('task-show').addClass('task-hidden');
		$('.task-nav').children().removeClass('active');
		$(this).parent().addClass('active');
	});
	$('.nav-doing').click(function(){
		$('.tab-to-do').removeClass('task-show').addClass('task-hidden');
		$('.tab-doing').removeClass('task-hidden').addClass('task-show');
		$('.tab-done').removeClass('task-show').addClass('task-hidden');
		$('.task-nav').children().removeClass('active');
		$(this).parent().addClass('active');
	});
	$('.nav-done').click(function(){
		$('.tab-to-do').removeClass('task-show').addClass('task-hidden');
		$('.tab-doing').removeClass('task-show').addClass('task-hidden');
		$('.tab-done').removeClass('task-hidden').addClass('task-show');
		$('.task-nav').children().removeClass('active');
		$(this).parent().addClass('active');
	});	
	$('.sort-normal').click(function(){
		var b = $(this).parent().next(),
			i = b.find('[data-task-sort=0]');
		b.find('.task-screen').prepend(i);
	});
	$('.sort-important').click(function(){
		var b = $(this).parent().next(),
			i = b.find('[data-task-sort=2]');
		b.find('.task-screen').prepend(i);
	});
	$('.sort-urgent').click(function(){
		var b = $(this).parent().next(),
		    i = b.find('[data-task-sort=1]');
		b.find('.task-screen').prepend(i);
	});
	$('.sort-time').click(function(){
		var b = $(this).parent().next(),
			s = b.find('.task-item').toArray(),
			timesort = s.sort(byTime('data-task')),
			c='';
		for(var i=0 ; i<timesort.length;i++){
			c += '<div class="task-item" data-task="'+ $(timesort[i]).data('task') +'" data-task-sort="'+ $(timesort[i]).data('task-sort') +'">'
			c += $(timesort[i]).html();
			c += '</div>'
		}
		b.find('.task-screen').html(c);
		c = '';
	});
	var byTime = function(name){
		return function(o,p){
			var a,b
			if(o && p && typeof o ==='object' && typeof p ==='object'){
				a = $(o).attr(name);
				b = $(p).attr(name);
				if(typeof a === typeof b){
						return a < b ? 1 : -1;
				}
			}else{
				throw('error');
			}
		}
	};
	var page = 2;
	$('.more-task').click(function(){
		var b = $(this);
		var that = $(this).parents('.task-container'),
			status = that.find('.task-screen').data('task-status'),
			taskcount = that.find('.task-item').length;
			console.log(status);
			console.log(taskcount);
		var	box = that.find('.task-screen');
		console.log(box);
		$.get('/task/ajaxLoadTask',{count:taskcount,status:status},function(data){
			if(data.data != ''){
				var item = data.tpl;
					d = data.data;
				for(var i in d){
					var c = $(item);
					c.attr('data-task',d[i].task_id);
					c.attr('data-task-sort',d[i].task_property);
					if(d[i].task_is_remind != 1){
						c.find('.task-remind').remove();
					}
					switch(d[i].task_property){
						case '1' :
							c.find('.task-property').addClass('task-urgent');
							break;
						case '2' : 
							c.find('.task-property').addClass('task-important');
							break;
						default :
							c.find('.task-property').addClass('task-normal');
							break;
					}
					c.find('.task-content').html(d[i].task_content);
					if(d[i].task_limit_time != '0000-00-00 00:00:00'){
						c.find('.task-limit-time > p').html('最后完成时间：'+ d[i].task_limit_time);
					}
					switch(d[i].task_status){
						case '0' :
							c.find('.task-action').children('.btn').addClass('start-task').html('开始任务');
							break;
						case '1' :
							c.find('.task-action').children('.btn').addClass('finish-task').html('任务完成');
							break;
						case '2' : 
							c.find('.task-action').children('.btn').addClass('disabled').html('已完成');
							break;
					}
					c.find('.task-create-time').children('span').html(d[i].task_create_time);
					if(d[i].task_reward != ''){
						c.find('.task-reward-info .btn-add').remove();
						c.find('.task-reward-info .rules-box').remove();
						c.find('.task-reward-info .rule-content').html(d[i].task_reward);
						
					}else{
						c.find('.task-reward-info .rule-content').remove();
					}
					if(d[i].task_punish != ''){
						c.find('.task-punish-info .btn-add').remove();
						c.find('.task-punish-info .rules-box').remove();
						c.find('.task-punish-info .rule-content').html(d[i].task_punish);
					}else{
						c.find('.task-punish-info .rule-content').remove();
					}
					if(d[i].task_status == '2'){
						c.find('.task-ud').remove('.js-update');
					}
					box.append(c);
				}
				page++;
			}else{
				b.hide();
				b.siblings('p').show();
			}
		})
	});
	$('.task-container').mCustomScrollbar({
		theme:"dark",
		setHeight: 520,
		autoDraggerLength: true,
		scrollbarPosition: "outside",
		mouseWheel:{ normalizeDelta: -1 },
	});

	
});