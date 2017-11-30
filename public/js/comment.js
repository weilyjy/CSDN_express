define(['jquery'],function(){
	var comment=function(){
		var bid = $('#bid').html();
		// var off = $('#off').html();
		$('#off').click(function(){
			$('#comment').css('display','none');
		})
		// $('#user').css('display','none');
		$('#comment_a').click(function(){
			var username = $('#user').html();
			var blogAuth = $('#username').html();
			// var bid = $('#bid').html();
			if ($('#user').html()!=null) {
				$('#comment').css('display','block');
				$('#comment_Btn').click(function(){
					var com_title = $('#com_title').val();
					var com_Conent=$('#com_Conent').val();
					var com_Date=$('#com_Date').val();

					if (com_title&&com_Conent) {
					$.ajax({
						url:'/comment/talk',
						type:'post',
						dataType:'json',
						data:{
							com_title:com_title,//评论的标题
							com_Conent:com_Conent,//评论的内容
							com_Date:com_Date,//评论的时间
							username:username,//评论人
							blogAuth:blogAuth,//被评论人
							bid:bid,//博客的具体id
						},
						success:function(data){
							// alert(data);
							alert('评论发表成功');
							$('#comment').css('display','none');

						}

					})
				}else{
					alert('请输入内容后在发布');
				}
					
				})

		}else{
			alert("请登录后在进行评论！");
			}
		})


//===============================获取评论===============================
	$.ajax({
			url:'/comment/commentList',
			type:'post',
			dataType:'json',
			data:{
				bid:bid,//博客的具体id
			},
			success:function(data){
				// alert(data);
				// alert('查询评论成功');
				var html='';
				for(var i=0;i<data.length;i++){
				    html+='<li><p id="comUserInfo"><i class="commImg"><img src="/images/comm.jpg"></i><span>用户名：'+data[i].com_user+
				    '</span></p><h3>标题：'+data[i].com_title+'<span>评论时间：'+data[i].com_date+'</span></h3><div class="blog_comment_conent">评论内容：'+data[i].com_conent+'</div></li>';
				    $('#blog_comment').find('ul').html(html);
				}



			}

		})	

	};






	return{
		comment:comment,
	}
})
