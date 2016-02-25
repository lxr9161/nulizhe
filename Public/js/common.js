$(function(){
    $('.monitor-length').bind('input propertychange',function(){
        var that = $(this),
            shwoWords = that.next('.show-length'),
            w = shwoWords.find('.words-length'),
            wordsLength = that.val().length,
            maxLength = shwoWords.data('length');
            console.log(maxLength);
       if(wordsLength <= maxLength){
            w.html(maxLength-wordsLength);
        }
        if(wordsLength > maxLength){
            var c = that.val().substr(0,maxLength);
            that.val(c);
            w.html(0);
        }
    });
})
