define(['jquery'],function(){
	var index=function(){
		// var username=;
		// alert(username);
		if ($('#user').html()!=null) { 
			$('#writelogo').click(function(){
				
					$(this).attr('href','/writeBlog');
				
			})
		}
//=================查询博客===============================
//
$.ajax({
			url:'/list',
			type:'post',
			// dataType:'json',
			success:function(data){
				// alert(data);
				// alert('bok成功');
				var html='';
				for(var i=0;i<data.resData.length;i++){
				
				 html+='<tr><td class="authorImg"><img src="/images/userImg.jpg" alt=""></td> <td class="author"><h4>博客作者:</h4>'+data.resData[i].username+'</td><td class="title"> <p><a href="/detail?bid='+data.resData[i].bid+'">标题:'+data.resData[i].title+'</a></p></td><td class="blogCon"><span>博客内容:</span>'+data.resData[i].blogConent+'</td></tr>';
				$('#blogList').find('table').html(html);
				}
				// html+=' <tr><td colspan="4"><a href="/list?pageNow=1">首页</a><a href="/list?pageNow='+data.pageNow+'">上一页</a>第'+data.pageNow+'页/共'+data.totalPage+'页<a href="/list?pageNow='+data.pageNow+'">下一页</a><a href="/list?pageNow='+data.pageNow+'">最后一页</a>共'+data.count+'条数据</td></tr>'
				// $('#blogList').find('table').html(html);

			}

	})

		

	};
	return {
		index:index,
	}
})