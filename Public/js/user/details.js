$(function(){
	var date = new Date();
	var nowYear = date.getFullYear(),
		yearOption = $('#birthdayYear'),
		monthOption = $('#birthdayMonth'),
		dayOption = $('#birthdayDay'),
		proOption = $('#province'),
		cityOption = $('#city'),
		year = yearOption.val(),
		month = monthOption.val(),
		day = dayOption.val(),
		province = proOption.val(),
		city = cityOption.val();

	var yopt,mopt,dopt,popt,copt,proArr = new Array();
	
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
		popt = '<option value="-1">请选择</option>';
		copt = '<option value="-1">请选择</option>';
		for(i in data) {
			if(data[i].provinceId == province){
				popt += '<option value="'+ data[i].provinceId +'" selected="selected">'+ data[i].province +'</option>';
				for(j in data[i].citys){
					if(data[i].citys[j].cityId == city){
						copt += '<option value="'+ data[i].citys[j].cityId +'" selected="selected">'+ data[i].citys[j].name +'</option>' 
					}else{
						copt += '<option value="'+ data[i].citys[j].cityId +'">'+ data[i].citys[j].name +'</option>' 
					}
				}
			}else {
				popt += '<option value="'+ data[i].provinceId +'">'+ data[i].province +'</option>'; 
			}
			proOption.html(popt);
			cityOption.html(copt);
		}
		proOption.change(function(){
			copt = '<option value="-1">请选择</option>';
			for(i in data){
				if(data[i].provinceId == $(this).val()){
					if(data[i].provinceId == 0){
						cityOption.hide();	
					}else{
						for(j in data[i].citys){
							copt += '<option value="'+ data[i].citys[j].cityId +'">'+ data[i].citys[j].name +'</option>';
						}
					}
					
				}
			}
			cityOption.html(copt);
		});
	});
});