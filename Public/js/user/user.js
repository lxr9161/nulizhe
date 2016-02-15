
$(function(){
		

	var jcrop_api,
    boundx,
    boundy,
    $preview = $('#preview-pane'),
    $pcnt = $('#preview-pane .preview-container'),
    $boxImage = $('.boxImage'),
    xsize = $pcnt.width(),
    ysize = $pcnt.height();
    $preview = $('#preview-pane'),    
    $('#jcrop-pic').Jcrop({
      onChange: updatePreview,
      onSelect: updatePreview,
      aspectRatio: 1,
    },function(){
      jcrop_api = this;
    });
    function updatePreview(c)
    {
        $pimg = $('#preview-pane .preview-container img');
     	var ggg = jcrop_api.getBounds();
     	if(ggg[0] == 300 && ggg[0] != ggg[1]){
     		var pt = (300 - ggg[1]) / 2;
     		$boxImage.css({
     			'padding-left' : 0,
     			'padding-top'  : pt
     		});
     	}else if(ggg[1] == 300 && ggg[0] != ggg[1]){
     		var pl = (300 - ggg[0]) / 2;
     		$boxImage.css({
     			'padding-left' : pl,
     			'padding-top'  : 0
     		});
     	}else if(ggg[0] == ggg[1]){
     		$boxImage.css({
     			'padding-left' : 0,
     			'padding-top'  : 0
     		});
     	}
	    if(parseInt(c.w) > 0){
	        var rx = xsize / c.w;
	        var ry = ysize / c.h;
	        $pimg.css({
	          width: Math.round(rx * ggg[0]) + 'px',
	          height: Math.round(ry * ggg[1]) + 'px',
	          marginLeft: '-' + Math.round(rx * c.x) + 'px',
	          marginTop: '-' + Math.round(ry * c.y) + 'px'
	        });
	    }
	};
	$("#demo1").AjaxFileUpload({
		action: 'user/upload',
		onComplete: function(filename, response) {
			$(".pic").attr("src", '/Uploads/' + response.file.savepath + response.file.savename);
				jcrop_api.setImage('/Uploads/' + response.file.savepath + response.file.savename);
				var size = [0,80,80,80];
				jcrop_api.setSelect(size);
            $('.notice').hide();
            $('.boxImage').show();
			$('.btn-reload').show();
		},
	});


		/*$('#upload').click(function(){
			$('.form').ajaxSubmit({
				dataType: 'json',
				success: function(data){
					console.log('/Uploads');
					$('.pic').attr('src','/Uploads/'+ data.photo.savepath + data.photo.savename);
				}
			});
			 return false;
		});*/

});
