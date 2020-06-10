$(function(){
	$('.smenu-btn').click(function(){
		$('.smenu-area').hasClass('on')? $('.smenu-area').removeClass('on') : $('.smenu-area').addClass('on');
	});
	$('.smenu-area .bg').click(function(){
		$('.smenu-area').removeClass('on');
	});
});