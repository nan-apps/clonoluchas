$(function(){
    
    var isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    
    if( isMobile ){
        $('#cr-stage').remove();
        $('#instructions').remove();
        $('#noMobile').show();
    }
    
});