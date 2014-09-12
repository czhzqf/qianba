function b(){
	h = $(window).height();
	t = $(document).scrollTop();
	if(t > h){
		$('#gotop').show();
	}else{
		$('#gotop').hide();
	}
}
$(document).ready(function(e) {
	b();
	$('#gotop').click(function(){
		$(document).scrollTop(0);	
	})
	$('#online').hover(function(){
			$(this).attr('id','online_hover');
		},function(){
			$(this).attr('id','online');
	})
	$('#code').hover(function(){
			$(this).attr('id','code_hover');
			$('#code_img').fadeIn(200);
		},function(){
			$(this).attr('id','code');
			$('#code_img').fadeOut();
	})
	
});

$(window).scroll(function(e){
	b();		
})
