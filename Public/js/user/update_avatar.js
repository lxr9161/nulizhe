$(function(){
	var jcrop_api,
        boundx,
        boundy,
        $preview = $('#preview-pane'),
        $pcnt = $('#preview-pane .preview-container'),
        $boxImage = $('.boxImage'),
        xsize = $pcnt.width(),
        ysize = $pcnt.height(),
        $prompt = $('.prompt');
  var $premini = $('preview-mini'),
      $preminibox = $('#preview-mini .preview-mini-box'),
      minixsize = $preminibox.width(),
      miniysize = $preminibox.height();
    $('#jcrop-pic').Jcrop({
      onChange: updatePreview,
      onSelect: updatePreview,
      aspectRatio: 1,
    },function(){
      jcrop_api = this;
      this.setSelect([0,0,300,300]);
    });
    function updatePreview(c)
    {
        var $pmini = $('#preview-mini .preview-mini-box img'),      
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
          var mx = minixsize / c.w;
          var my = miniysize / c.h;
	        $pimg.css({
	          width: Math.round(rx * ggg[0]) + 'px',
	          height: Math.round(ry * ggg[1]) + 'px',
	          marginLeft: '-' + Math.round(rx * c.x) + 'px',
	          marginTop: '-' + Math.round(ry * c.y) + 'px'
	        });
          $pmini.css({
            width: Math.round(mx * ggg[0]) + 'px',
            height: Math.round(my * ggg[1]) + 'px',
            marginLeft : '-' + Math.round(mx * c.x) + 'px',
            marginTop : '-' + Math.round(my * c.y) + 'px'
          });
	    }
	};
	$("#demo1").AjaxFileUpload({
		action: '/user/upload',
		onComplete: function(filename, response) {
            if(response.status == 'error'){
                $prompt.html("<div class='text-danger'><span class='prompt-icon glyphicon glyphicon-remove-sign'></span> " + response.Info + '</div>');
            }else{
                $(".pic").attr("src", '/Uploads/' + response.file.savepath + response.file.savename);
                jcrop_api.setImage('/Uploads/' + response.file.savepath + response.file.savename);
                var size = [0,0,300,300];
                jcrop_api.setSelect(size);
                $('.notice').hide();
                $('.boxImage').show();
                $('#imgSrc').val('/Uploads/' + response.file.savepath + response.file.savename);
                $('#postStatus').val(0);
                $('.btn-save').removeClass('disabled');
            }
		},
	});
    $('.btn-save').click(function(){
        var crop = jcrop_api.tellSelect(),
            cropImg = jcrop_api.getWidgetSize(),
            pw = $('.jcrop-preview').width(),
            ph = $('.jcrop-preview').height(),
            miniw = $('.jcrop-preview-mini').width(),
            minih = $('.jcrop-preview-mini').height();
        $('#x').val(crop.x);
        $('#y').val(crop.y);
        $('#w').val(crop.w);
        $('#h').val(crop.h);
        $('#pw').val(pw);
        $('#ph').val(ph);
        $('#cw').val(cropImg[0]);
        $('#ch').val(cropImg[1]);
        $('#miniw').val(miniw);
        $('#minih').val(minih);
        $.post('/user/saveAvatar',$('#imgInfo').serialize(),function(data){
          console.log(data);
            if(data.status == 'success'){
                $('#postStatus').val(1);
                $('.btn-save').addClass('disabled');
                $prompt.html("<div class='text-success'><span class='prompt-icon glyphicon glyphicon-ok-sign'></span> " + data.Info + '</div>');
                $(".pic").attr("src", '/Public/images/3.png');
                jcrop_api.setImage('/Public/images/3.png');
                var size = [0,0,300,300];
                jcrop_api.setSelect(size);
                $('.notice').show();
                $('.notice').css('background-position','-300px 0');
                $('.boxImage').hide();
            }else if(data.status == 'error'){
                $prompt.html("<div class='text-danger'><span class='prompt-icon glyphicon glyphicon-remove-sign'></span> " + data.Info + '</div>');
            }
        },'json');
    });
});
