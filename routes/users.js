var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
//创建一个mongodb的客户端
var MongoClient = mongodb.MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/blog';


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//======================注册=============
router.all('/registor', function(req, res, next) {
	// console.log(req.body.username);
	var username = req.body.username;
	var userpassword =req.body.userpassword;
	var userImg = '/images/userImg.jpg';
	var data = [{username:username,userpassword:userpassword,userImg:userImg}];
	
	//判断手机号是否被注册过，如果被注册过，就返回false,否则返回true；
	function findData(db){
		var conn=db.collection('user');
		// var flag;
		conn.findOne({username:username},function(err,result){
			if (result) {
				console.log(result);
				console.log('该手机号已被注册');
				res.send(result);
				// flag=1;
			}else{
				console.log(123);
				insertData(db);
			}
			

		})
	}
	//注册之前检查手机号是否被注册过
	function insertData(db){
		var conn=db.collection('user');
		conn.insert(data,function(err,result){
			if(err){
				console.log('用户注册失败');

			}else{
				req.session.username=username;
				res.redirect('/');
				db.close();
				console.log('数据库关闭成功');
			}
		})
	}
	if (data) {
		MongoClient.connect(DB_CONN_STR,function(err,db){
			if (err) {
				console.log(err);
				return
			}else{
				console.log('连接数据库成功！');
				findData(db);
			}


		})
	}else{
		res.redirect('/registor');
	}
	
	// var userPwd=req.body.userPwd;
 
  // res.render('registor', { title: 'registor' });
});
//=================================================
router.all('/loginVerify', function(req, res, next) {
  var username = req.body.username;
  MongoClient.connect(DB_CONN_STR,function(err,db){
			if (err) {
				console.log(err);
				return;
			}else{
				console.log('连接数据库成功！');
				var conn=db.collection('user');
			  conn.findOne({username:username},function(err,result){
			  	if (err) {
			  		console.log(err);
			  		return;
			  	}else{
			  		console.log(result);
			  		if (result) {
			  			res.send(result);
			  		}
			  		
			  	}

			  });
				
			}


		});
  

});


//=====================登录====================
router.all('/login', function(req, res, next) {
	var username = req.body.username;
	var userpassword =req.body.userpassword;
	var data = {username:username,userpassword:userpassword};
	console.log(data);
	function findData(db){
		var conn=db.collection('user');
		conn.find(data,{username:0,userpassword:0}).toArray(function(err,result){
			if(result.length>0){
				console.log(result);
				console.log('用户登录成功');
				req.session.username=username;
				req.session.userImg=result[0].userImg;
				console.log(result[0].userImg);
				res.redirect('/');
				db.close();
			}else{
				console.log('用户登录失败');
				db.close();
				res.redirect('/login');
			}
			
		})
	}
	if (data) {
		MongoClient.connect(DB_CONN_STR,function(err,db){
			if (err) {
				console.log(err);
				return;
			}else{
				console.log('连接数据库成功！');
				findData(db);
			}


		})
	}else{
		res.redirect('/login');
	}
});

module.exports = router;
