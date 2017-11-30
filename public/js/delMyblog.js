
	$(function(){
		var blog_Bid=$('#blog_Bid').html();
		$('#delMyblog').click(function(){
			alert('#'+blog_Bid);
			var _this=this;
			$.ajax({
				url:'/writeBlog/delMyblog',
				type:'post',
				data:{blog_Bid:blog_Bid},
				success:function(data){
					// alert(data);
					$('#'+blog_Bid).remove();
					// alert('删除成功！');

				}
			})
		})

	})
