require.config({
	shim:{
		cookie:["jquery"]
	},
	paths:{
		"jquery": "jquery-1.11.1",
		'registor':'registor',
		'login':'login',
		'writeBlog':'writeBlog',
		'comment':'comment',
		'index':'index',
		
		
	}
})
require(["jquery",'registor','login','writeBlog','comment','index'],
 function($, registor,login,writeBlog,comment,index){
	registor.registor();
	login.login();
	writeBlog.writeBlog();
	comment.comment();
	index.index();
	
})

