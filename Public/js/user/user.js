$(function(){
		


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
      aspectRatio: 1
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
   	
    console.log(jcrop_api);
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
					$('.btn-reload').show();
					jcrop_api.setImage('/Uploads/' + response.file.savepath + response.file.savename);
				}
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
