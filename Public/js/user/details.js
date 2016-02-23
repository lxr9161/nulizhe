$(function(){
	var date = new Date();
	var nowYear = date.getFullYear(),
		yearOption = $('#birthdayYear'),
		monthOption = $('#birthdayMonth'),
		dayOption = $('#birthdayDay'),
		year = yearOption.val(),
		month = monthOption.val(),
		day = dayOption.val();
	var yopt,mopt,dopt;
	
	SelectDay(year,month);
	for(var i = nowYear; i >=1900; i--){	
		yopt += addOption(i,year);
		yearOption.html(yopt);
	}
	for (var i = 1; i<= 12; i++){
		mopt += addOption(i,month);
		monthOption.html(mopt);
	}
	yearOption.change(function(){
		SelectDay(yearOption.val(),monthOption.val());
	});
	monthOption.change(function(){
		SelectDay(yearOption.val(),monthOption.val());
	});

	function DayNumOfMonth(Year,Month)
	{
	    var d = new Date(Year,Month,0);
	    return d.getDate();
	}
	function addOption(index,val){
		var c;
		index < 10 ? c = '0'+index : c = index;
		if(index == val){
			opt = '<option value="'+ index +'" selected="selected">'+ c +'</option>';
		}else{
			opt = '<option value="'+ index +'">'+ c +'</option>';
		}
		return opt;
	}
	function SelectDay(Year,Month){
		dopt ='';
		var dayNum = DayNumOfMonth(Year,Month);
		for(var i = 1; i<=dayNum;i++){
			dopt += addOption(i,day);
			dayOption.html(dopt);
		}
	}
	$.getJSON('/public/js/city.json',function(data){
		console.log(data);
		
	});
});