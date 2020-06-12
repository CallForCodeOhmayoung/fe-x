function indexView() {
	var searchSidebarSection = document.getElementById('search-sidebar');
	var loginSection = document.getElementById('login');
	var signupSection = document.getElementById('signup');

	searchSidebarSection.classList.remove('pop-down');
	loginSection.classList.add('pop-up');

	loginSection.classList.remove('pop-up');
	loginSection.classList.add('pop-down');

	signupSection.classList.remove('pop-up');
	signupSection.classList.add('pop-down');

	console.log('call indexView() function');
}

function signinView() {
	var searchSidebarSection = document.getElementById('search-sidebar');
	var loginSection = document.getElementById('login');
	var signupSection = document.getElementById('signup');

	searchSidebarSection.classList.remove('pop-up');
	loginSection.classList.add('pop-down');

	loginSection.classList.remove('pop-down');
	loginSection.classList.add('pop-up');

	signupSection.classList.remove('pop-up');
	signupSection.classList.add('pop-down');

	console.log('call signinView() function');
}

function signupView() {
	var searchSidebarSection = document.getElementById('search-sidebar');
	var loginSection = document.getElementById('login');
	var signupSection = document.getElementById('signup');

	searchSidebarSection.classList.remove('pop-up');
	loginSection.classList.add('pop-down');

	loginSection.classList.remove('pop-up');
	loginSection.classList.add('pop-down');

	signupSection.classList.remove('pop-down');
	signupSection.classList.add('pop-up');

	console.log('call signupView() function');
};

var smenu_area = document.getElementsByClassName('smenu-area')[0];

document.getElementsByClassName('smenu-btn')[0].onclick = function(){
	smenu_area.classList.contains('on')? smenu_area.classList.remove('on') : smenu_area.classList.add('on');
}

smenu_area.getElementsByClassName('bg')[0].onclick = function() {
	smenu_area.classList.remove('on');
}

document.addEventListener("DOMContentLoaded", function(){  // Start

	indexView();

	var myToken = "";
	var myExpiredAt = "";

	// sign up 페이지 이동: 회원가입 클릭 시
	document.getElementById('call-signup').onclick = signupView;

	// sign up 페이지 이동: 회원가입 취소 시
	document.getElementById('signup-cancel').onclick = signinView;

	// MY QR CODE 메뉴 클릭 시
	document.getElementsByClassName('menu-qr')[0].onclick = function(){
		if (myToken == "") {
			signinView();
			smenu_area.classList.remove('on');
		} else {

		}
	};
	
	// sign up request
	var signupSubmit = document.getElementById('signup-submit');
	signupSubmit.onclick = function (){
		var url = 'https://for-ibm.hax0r.info/authentication/sign-up';
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				phoneNumber: document.getElementById('phoneNumber-at-signup').value,
				password: document.getElementById('password-at-signup').value
			})
		}).then(function(response) {
			if(response.ok){
				alert("가입 성공");
				signinView();
				return response.json();
			}
			alert("가입 실패");
		}).then(function(data){
			myToken = JSON.parse(JSON.stringify(data)).token;
			myExpiredAt = JSON.parse(JSON.stringify(data)).expiredAt;
			console.log('myToken ' + myToken);
			console.log('myExpiredAt ' + myExpiredAt);
		});
	};

	// sign in request
	var signinSubmit = document.getElementById('signin-submit');
	signinSubmit.onclick = function (){
		var url = 'https://for-ibm.hax0r.info/authentication/token';
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				phoneNumber: document.getElementById('phoneNumber-at-signin').value,
				password: document.getElementById('password-at-signin').value
			})
		}).then(function(response) {
			if(response.ok){
				alert("로그인 성공");
				indexView();
				return response.json();
			}
			alert("로그인 실패");
		}).then(function(data){
			myToken = JSON.parse(JSON.stringify(data)).token;
			myExpiredAt = JSON.parse(JSON.stringify(data)).expiredAt;
			console.log('myToken ' + myToken);
			console.log('myExpiredAt ' + myExpiredAt);
		});
	};

});

/* jquery: sidebar popup ver 1
$(function(){
	$('.smenu-btn').click(function(){
		$('.smenu-area').hasClass('on')? $('.smenu-area').removeClass('on') : $('.smenu-area').addClass('on');
	});
	$('.smenu-area .bg').click(function(){
		$('.smenu-area').removeClass('on');
	});
});
*/

/* jquery: sidebar popup ver 2
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