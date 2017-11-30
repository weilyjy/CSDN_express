var express = require('express');
var router = express.Router();
var async =require('async');
var mongodb =require('mongodb');
var MongoClient=mongodb.MongoClient;
var DB_CONN_STR="mongodb://localhost:27017/blog";
router.get('/', function(req, res, next) {
  res.render('writeBlog', {title:'writeBlog',username:req.session.username,userImg:req.session.userImg});
});

router.all('/write',function(req,res,next){
	var title = req.body.title;
	var blogDate=req.body.blogDate;
	var blogConent= req.body.blogConent;
	var username = req.body.username;
	console.log(blogConent);
	console.log(username);
	console.log(title);
	// var data = [{username:username,title:title,blogConent:blogConent}];
	function insertDatat(db){
		var blogCon = db.collection('blogCon');
		var ids = db.collection('ids');
		async.waterfall([
			function(callback){
				 ids.findAndModify(
			          {name: 'blog'}, //查询条件
			          [['_id', 'desc']], //排序
			          {$inc: {bid:1}},    //自增 cid = cid +1
			          function(err, results) {
			            console.log(results);
			            callback(null, results.value.bid);
			          }
			        )
			},
			function(bid,callback){
			  var data = [{bid:bid,username:username,title:title,blogConent:blogConent,blogDate:blogDate}];
			  blogCon.insert(data,function(err,result){
			  	if (err) {
			  		console.log(err);
			  		return;
			  	}else{
			  		console.log(result);
			  		console.log('发表博客成功');
			  		res.send(result);
			  		db.close();
			  		
			// res.render('index', { title: 'index' ,result:req.session.result});
			  		
			  		callback(null,'');

			  	}

			  })
			}
		],function(err,result){
			// console.log(result);
			// res.render('registor', { title: 'registor' ,result:req.session.result});
			// res.redirect('./');
			// res.redirect('/list');
		})


	}
		//插入到数据库中
		MongoClient.connect(DB_CONN_STR,function(err,db){
			if (err) {
				console.log(err);
				return;
			}else{
				insertDatat(db);
			}

		})

	
	
});
router.get('/lookMyBlog',function(req,res,next){

	var username = req.query['username'];
	console.log("用户名："+username);
	var data = {username:username};
	console.log(username);
	function findData(db){
		var conn = db.collection('blogCon');
		conn.find(data).toArray(function(err,results){
			if (err) {
				console.log(err);
				return;
			}else{
			console.log("MyBlog------------->"+results);
			console.log(results);

			// res.send("MyBlog"+results)
			res.render('myBlog',{results:results,username:username})
			}

		})

	}
	//数据库中
		MongoClient.connect(DB_CONN_STR,function(err,db){
			if (err) {
				console.log(err);
				return;
			}else{
				findData(db);
			}

		})

	// res.send("MyBlog");
});

router.all('/delMyblog',function(req,res,next){
	var blog_Bid = parseInt(req.body.blog_Bid);

	console.log(blog_Bid);
	// var data = {bid:blog_Bid}
	function delData(db){
		var conn = db.collection('blogCon');

		conn.deleteOne({bid:blog_Bid},function(err,results){
			if (err) {
				console.log(err);
				return;
			}else{
				console.log('删除Id:'+results);
				res.send(results);
				console.log(results);
			}

		})

	}

//数据库中
		MongoClient.connect(DB_CONN_STR,function(err,db){
			if (err) {
				console.log(err);
				return;
			}else{
				delData(db);
			}

		})
})

module.exports = router;