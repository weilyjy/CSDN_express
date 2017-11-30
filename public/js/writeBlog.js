define(['jquery'],function(){
	var writeBlog=function(){
		
		$('#upData').click(function(){
			var title=$('#title').val();
			var username=$('#username').html();
			var blogConent=$('#blogConent').val();
			var blogDate=$('#blogDate').val();
			
			// alert(blogConent);
			if (title&&blogConent) {
				$.ajax({
					url:'/writeBlog/write',
					type:'post',
					dataType:'json',
					data:{title:title,blogConent,blogConent,username:username,blogDate:blogDate},
					success:function(data){
						alert('发表博客成功！');

					}

				})
			}else{
				alert('请输入内容后在发布');
			}
			
		})
		
		// alert(title);
		// console.log(title,blogConent);

	};
	return {
		writeBlog:writeBlog,
	}
})