var searchSidebarSection = document.getElementById('search-sidebar');
var loginSection = document.getElementById('login');
var signupSection = document.getElementById('signup');
var qrcodeSection = document.getElementById('qrcode');

var myToken = "";
var myExpiredAt = "";

function indexView() {
	searchSidebarSection.classList.remove('pop-down');
	searchSidebarSection.classList.add('pop-up');

	loginSection.classList.remove('pop-up');
	loginSection.classList.add('pop-down');

	signupSection.classList.remove('pop-up');
	signupSection.classList.add('pop-down');

	qrcodeSection.classList.remove('pop-up');
	qrcodeSection.classList.add('pop-down');

	console.log('call indexView() function');
}

function signinView() {
	searchSidebarSection.classList.remove('pop-up');
	searchSidebarSection.classList.add('pop-down');

	loginSection.classList.remove('pop-down');
	loginSection.classList.add('pop-up');

	signupSection.classList.remove('pop-up');
	signupSection.classList.add('pop-down');

	qrcodeSection.classList.remove('pop-up');
	qrcodeSection.classList.add('pop-down');

	console.log('call signinView() function');
}

function signupView() {
	searchSidebarSection.classList.remove('pop-up');
	searchSidebarSection.classList.add('pop-down');

	loginSection.classList.remove('pop-up');
	loginSection.classList.add('pop-down');

	signupSection.classList.remove('pop-down');
	signupSection.classList.add('pop-up');

	qrcodeSection.classList.remove('pop-up');
	qrcodeSection.classList.add('pop-down');

	console.log('call signupView() function');
};

function qrcodeView() {
	searchSidebarSection.classList.remove('pop-up');
	searchSidebarSection.classList.add('pop-down');

	loginSection.classList.remove('pop-up');
	loginSection.classList.add('pop-down');

	signupSection.classList.remove('pop-up');
	signupSection.classList.add('pop-down');

	qrcodeSection.classList.remove('pop-down');
	qrcodeSection.classList.add('pop-up');

	console.log('call qrcodeView() function');
}

document.getElementsByClassName('smenu-btn')[0].onclick = function(){
	//smenu_area.classList.contains('on')? smenu_area.classList.remove('on') : smenu_area.classList.add('on');
	var smenu_area = document.getElementsByClassName('smenu-area')[0];
	smenu_area.classList.add('on');
}

// modal background 클릭 시 index 화면 보이기
var bg = document.getElementsByClassName('bg');
var onBgClick = function() {
    var smenu_area = document.getElementsByClassName('smenu-area')[0];
	smenu_area.classList.remove('on');
	indexView();
};
Array.from(bg).forEach(function(element) {
	element.addEventListener('click', onBgClick);
});

document.addEventListener("DOMContentLoaded", function(){  // Start

	indexView();

	// sign up 페이지 이동: 회원가입 클릭 시
	document.getElementById('call-signup').onclick = signupView;

	// sign up 페이지 이동: 회원가입 취소 시
	document.getElementById('signup-cancel').onclick = signinView;

	// MY QR CODE 메뉴 클릭 시
	document.getElementsByClassName('menu-qr')[0].onclick = function(){
		if (myToken == "") {
			signinView();
			var smenu_area = document.getElementsByClassName('smenu-area')[0];
			smenu_area.classList.remove('on'); // sidebar 사라짐
		} else {
			retrieve();
			qrcodeView();
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

	// retrieve my information request
	var myPhoneNumber;
	var myQrCode;
	function retrieve(){
		var url = 'https://for-ibm.hax0r.info/me';
		fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authorization': 'Bearer ' + myToken
			}
		}).then(function(response) {
			if(response.ok){
				console.log('me request success');
				return response.json();
			}
			console.log('me request fail');
		}).then(function(data){
			myPhoneNumber = JSON.parse(JSON.stringify(data)).phoneNumber;
			myQrCode = JSON.parse(JSON.stringify(data)).qrCode;
			console.log('myPhoneNumber ' + myPhoneNumber);
			console.log('myQrCode ' + myQrCode);
			readQR();
		});
	}

	function readQR(){
		console.log(myQrCode);
		document.getElementById('qrcodeImg').src = myQrCode;
	}

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