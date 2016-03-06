$(function(){
	var date = new Date();
	var nowYear = date.getFullYear(),
		yearOption = $('#birthdayYear'),
		monthOption = $('#birthdayMonth'),
		dayOption = $('#birthdayDay'),
		proOption = $('#province'),
		cityOption = $('#city'),
		signOption = $('#sign'),
		year = yearOption.val(),
		month = monthOption.val(),
		day = dayOption.val(),
		province = proOption.val(),
		city = cityOption.val(),
		sign = signOption.val();

	var yopt,mopt,dopt,popt,copt,sopt,proArr = new Array();
	var signs = [{'sign':'白羊座'},{'sign':'金牛座'},{'sign':'双子座'},{'sign':'巨蟹座'},{'sign':'狮子座'},{'sign':'处女座'},{'sign':'天秤座'},{'sign':'天蝎座'},{'sign':'射手座'},{'sign':'摩羯座'},{'sign':'水瓶座'},{'sign':'双鱼座'}] 
	sopt = '<option value="">请选择</option>'
	for (var i in signs){
		if(signs[i].sign == sign){
			sopt += '<option value="'+ signs[i].sign +'" selected="selected">'+ signs[i].sign +'</option>';
		}else{
			sopt += '<option value="'+ signs[i].sign +'">'+ signs[i].sign +'</option>';
		}
	};
	for(var i = nowYear; i >=1900; i--){	
		yopt += addOption(i,year);
	};
	for (var i = 1; i<= 12; i++){
		mopt += addOption(i,month);
	};
	SelectDay(year,month);
	yearOption.html(yopt);
	monthOption.html(mopt);
	signOption.html(sopt);
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
		popt = '<option value="">请选择</option>';
		copt = '<option value="">请选择</option>';
		for(i in data) {
			if(data[i].province == province){
				popt += '<option value="'+ data[i].province +'" selected="selected">'+ data[i].province +'</option>';
				for(j in data[i].citys){
					if(data[i].citys[j].name == city){
						copt += '<option value="'+ data[i].citys[j].name +'" selected="selected">'+ data[i].citys[j].name +'</option>' 
					}else{
						copt += '<option value="'+ data[i].citys[j].name +'">'+ data[i].citys[j].name +'</option>' 
					}
				}
			}else {
				popt += '<option value="'+ data[i].province +'">'+ data[i].province +'</option>'; 
			}
			proOption.html(popt);
			cityOption.html(copt);
		}
		proOption.change(function(){
			copt = '<option value="请选择">请选择</option>';
			for(i in data){
				if(data[i].province == $(this).val()){
					if(data[i].province == '其他'){
						cityOption.hide();	
					}else{
						cityOption.show();
						for(j in data[i].citys){
							copt += '<option value="'+ data[i].citys[j].name +'">'+ data[i].citys[j].name +'</option>';
						}
					}
					
				}
			}
			cityOption.html(copt);
		});
	});
});