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
});