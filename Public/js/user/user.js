
$(function(){
	var jcrop_api,
        boundx,
        boundy,
        $preview = $('#preview-pane'),
        $pcnt = $('#preview-pane .preview-container'),
        $boxImage = $('.boxImage'),
        xsize = $pcnt.width(),
        ysize = $pcnt.height(),
        $preview = $('#preview-pane'),
        $prompt = $('.prompt');
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
    $('.pic-words').bind('input propertychange',function(){
        var that = $(this),
            wordsLength = $(this).val().length;
        if(wordsLength <= 40){
            $('.words-length').html(40-wordsLength);
        }
        if(wordsLength > 40){
            var words = that.val().substr(0,40);
            that.val(words);
            $('.words-length').html(0);
        }
    });
    $('.btn-save').click(function(){
        var crop = jcrop_api.tellSelect(),
            cropImg = jcrop_api.getWidgetSize(),
            pw = $('.jcrop-preview').width(),
            ph = $('.jcrop-preview').height();
        $('#x').val(crop.x);
        $('#y').val(crop.y);
        $('#w').val(crop.w);
        $('#h').val(crop.h);
        $('#pw').val(pw);
        $('#ph').val(ph);
        $('#cw').val(cropImg[0]);
        $('#ch').val(cropImg[1]);
        $.post('user/imgCrop',$('#imgInfo').serialize(),function(data){
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
                $('.pic-words').val('');
                var picInfo = '<span class ="pic-item">';
                    picInfo += '<img class="pic-size" src="'+ data.picInfo.pic_path +'"/><br/>';
                    picInfo += '<span class="words">'+ data.picInfo.pic_words +'</span>';
                    picInfo += '</span>';
                $('.pic-box').prepend(picInfo);
                $('.boxImage').hide();
            }else if(data.status == 'error'){
                $prompt.html("<div class='text-danger'><span class='prompt-icon glyphicon glyphicon-remove-sign'></span> " + data.Info + '</div>');
            }
        },'json');
    });
});
