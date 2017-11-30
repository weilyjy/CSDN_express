define(['jquery'],function(){
	var login=function(){
			var username=null;
			var userpassword=null;
			$('#log_username').blur(function(){
				var usernameStr=$(this).val();
				var pattern1 = /0?(13|17|15|18)[0-9]{9}/;
				if (!pattern1.test(usernameStr)) {
					$('#username_err').css("display",'block');
					$('#username_err').html("请输入正确的手机号");
				}else{
					username=$(this).val();
				}

			});
			$('#log_username').focus(function(){
				$('#username_err').css("display",'none');
			})

			$('#log_userpwd').blur(function(){
				var userpwdStr=$(this).val();
				var pattern2=/^[0-9A-Za-z]{6,}$/;
				if (!pattern2.test(userpwdStr)) {
					$('#userpwd_err').css("display",'block');

					$('#userpwd_err').ht;
				}else{
					userpassword=$(this).val();
				}

			});
			$('#log_userpwd').focus(function(){
				$('#userpwd_err').css("display",'none');
			})
			$('#log_form').submit(function(){
				if (username&&userpassword) {
					// alert(username)
					return true;


				}else{
					// alert(1);
				 $('#userpwd_err').css("display",'block');
				  $('#userpwd_err').html('请输入正确的信息');
					return false;
				}
			})	
	};
	return {
		login:login,
	}
})
		