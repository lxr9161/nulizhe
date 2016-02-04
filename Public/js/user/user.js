function autoImg(){
	var boxW = $('.boxImage').width();
	var boxH = $('boxImage').height();
	var imgW = $('#jcrop-pic').width();
	var imgH = $('#jcrop-pic').height();
	if(imgW > imgH && imgW > boxW) {
		alert(123);
		$('#jcrop-pic').width(boxW);
		$('#jcrop-pic').height(imgH*(boxW/imgH));
	}else if(imgW < imgH && imgH > boxH){
		alert(123);
		$('#jcrop-pic').height(boxH);
		$('#jcrop-pic').width(imgW*(boxH/imgH));
	}else if(imgH == imgW && imgW > boxH){
		$('#jcrop-pic').width(boxW).height(boxH);
	}
	alert(123);
};
$(function(){
		
	$('#jcrop-pic')

		var jcrop_api,
        boundx,
        boundy,x

        // Grab some information about the preview pane
        $preview = $('#preview-pane'),
        $pcnt = $('#preview-pane .preview-container'),
        $pimg = $('#preview-pane .preview-container img'),

        xsize = $pcnt.width(),
        ysize = $pcnt.height();
    
    $('#jcrop-pic').Jcrop({
      onChange: updatePreview,
      onSelect: updatePreview,
      aspectRatio: 1,
    },function(){
      // Use the API to get the real image size
      var bounds = this.getBounds();
      boundx = bounds[0];
      boundy = bounds[1];
      // Store the API in the jcrop_api variable
      jcrop_api = this;

      // Move the preview into the jcrop container for css positioning
      $preview.appendTo(jcrop_api.ui.holder);
    });
   	 
    function updatePreview(c)
    {
      if (parseInt(c.w) > 0)
      {
        var rx = xsize / c.w;
        var ry = ysize / c.h;

        $pimg.css({
          width: Math.round(rx * boundx) + 'px',
          height: Math.round(ry * boundy) + 'px',
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
						
						/*console.log($('#jcrop-pic').width());
						console.log($('#jcrop-pic').height());*/
				
					
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
