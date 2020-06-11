/*
$(function(){
	$('.smenu-btn').click(function(){
		$('.smenu-area').hasClass('on')? $('.smenu-area').removeClass('on') : $('.smenu-area').addClass('on');
	});
	$('.smenu-area .bg').click(function(){
		$('.smenu-area').removeClass('on');
	});
});
*/

document.getElementsByClassName('.smenu-btn').onclick = function (){
	var smenu_area = document.getElementsByClassName('.smenu-area');
	var bg = document.getElementsByClassName('.bg');

	smenu_area.hasClass('on')? smenu_area.removeClass('on') : smenu_area.addClass('on');
	smenu_area.hasClass('on')? bg.addClass('on'): bg.removeClass('on');
	
};

document.addEventListener("DOMContentLoaded", function(){  // Start

	document.getElementById('call-signup').onclick = function (){
		var loginSection = document.getElementById('login');
		var signupSection = document.getElementById('signup');

		loginSection.classList.remove('pop-up');
		loginSection.classList.add('pop-down');

		signupSection.classList.remove('pop-down');
		signupSection.classList.add('pop-up');
	}

});

/*
$(function(){
	$('.smenu-btn').click(function(){
		if($('.smenu-area').hasClass('on')){
			$('.smenu-area').removeClass('on');
			$('.smenu-area .bg').stop().fadeOut(300);
			$('.btn-list a').css('zIndex', 0);
		}else{
			$('.smenu-area').addClass('on');
			$('.smenu-area .bg').stop().fadeIn(300);
			$('.btn-list a').css('zIndex', -1);
		}
	});
	$('.smenu-area .bg').click(function(){
		$('.smenu-area').removeClass('on');
		$('.smenu-area .bg').stop().fadeOut(300);
		$('.btn-list a').css('zIndex', 0);
	});
});
*/
/*
document.addEventListener("DOMContentLoaded", function(){  // Start
	var myToken = "";
    var myExpiredAt = "";

	// Sign Up
	var signup = document.getElementById('signup');
	signup.onclick = function (){
		console.log(document.getElementById('signup').value);
		var url = 'https://for-ibm.hax0r.info/authentication/sign-up';
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				'phoneNumber': document.getElementById('phoneNumber').value,
				'password': document.getElementById('password').value
			}
		}).then(function(response) {
			if(response.ok){
				alert("가입 성공");
				return response.json();
			}
			console.log(response.json);
			alert("가입 실패");
		}).then(function(data){
			console.log(data);
			myToken = JSON.parse(JSON.stringify(data)).token;
			expiredAt = JSON.parse(JSON.stringify(data)).expiredAt;
			document.getElementById('lblFrom').innerHTML = myToken;
		});
	};
});
*/
 
 
 $('.smenu-btn').click(function(){
	$('.smenu-area').hasClass('on')? $('.smenu-area').removeClass('on') : $('.smenu-area').addClass('on');
	$('.smenu-area').hasClass('on')? $('.bg').addClass('on'): $('.bg').removeClass('on');
 });
 
 $('.smenu-area .bg').click(function(){
	$('.smenu-area').removeClass('on');
 });
 
 
 
	
	function NonDisplay(target){
	   if(target == "search"){
		  $('.bg').addClass('on');
	   }
	   var con = document.getElementById(target);
	   con.style.display = "none";
	}
 
	function Display(target){
	   if(target == "search"){
		  $('.bg').removeClass('on');
	   }
	   var con = document.getElementById(target);
	   con.style.display = "block";
	}