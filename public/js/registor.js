define(['jquery'],function(){
	var registor=function(){
			var username=null;
			var userpassword=null;
			$('#reg_username').blur(function(){
				var usernameStr=$(this).val();
				var pattern1 = /0?(13|17|15|18)[0-9]{9}/;
				if (!pattern1.test(usernameStr)) {
					$('#username_err').css("display",'block');
					$('#username_err').html("请输入正确的手机号");
				}else{
					username=$(this).val();
					$.ajax({
						url:'/users/loginVerify',
						data:{username:username},
						type:'post',
						success:function(data){
							// alert(data);
							if (data!=null) {
								$('#username_err').css("display",'block');
								$('#username_err').html("该手机号已被注册");
								username=null;
							}
						}

					})
				}

			});
			$('#reg_username').focus(function(){
				$('#username_err').css("display",'none');
			})

			$('#reg_userpwd').blur(function(){
				var userpwdStr=$(this).val();
				var pattern2=/^[0-9A-Za-z]{6,}$/;
				if (!pattern2.test(userpwdStr)) {
					$('#userpwd_err').css("display",'block');

					$('#userpwd_err').html("请输至少6位有数字和字母组成的密码");
				}else{
					userpassword=$(this).val();
				}

			});
			$('#reg_userpwd').focus(function(){
				$('#userpwd_err').css("display",'none');
			})
			
			$('#reg_form').submit(function(){
				// if (result) {
				// 	$('#userpwd_err').html('您输入的手机号已被注册！');
				// }
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
		registor:registor,
	}
})
		