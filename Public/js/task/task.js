$(function(){
	$(".choose-time").DateTimePicker({
				
		language:'zh-CN',
		defaultDate: new Date(),
		animationDuration:200,
		buttonsToDisplay: [ "SetButton", "ClearButton"],
		clearButtonContent: "取消",
		isPopup: false,
	});
});