var express = require('express');
var router = express.Router();
var async = require('async');
var async =require('async');
var mongodb =require('mongodb');
var MongoClient=mongodb.MongoClient;
var DB_CONN_STR="mongodb://localhost:27017/blog";
/* GET home page. */
router.get('/', function(req, res, next){
  res.render('comment', { title: 'comment',username:req.session.username,userImg:req.session.userImg});
});
router.all('/talk', function(req, res, next){
	
	var com_title = req.body.com_title;//评论的标题
	var com_conent= req.body.com_Conent;//评论的内容
	var com_date = req.body.com_Date;//评论的时间
	var com_user = req.body.username;//评论人
	var blogAuth = req.body.blogAuth;//被评论人
	var bid = req.body.bid;
	console.log("被评论人"+blogAuth);
	console.log("评论的时间"+com_date);
	console.log("评论人"+com_user);
	console.log("评论的标题"+com_title);
	console.log(bid);
	// var data = [{username:username,title:title,blogConent:blogConent}];
	function insertData(db){
		var comment = db.collection('comment');
		var ids = db.collection('ids');
		async.waterfall([
			function(callback){
				 ids.findAndModify(
			          {name: 'comment'}, //查询条件
			          [['_id', 'desc']], //排序
			          {$inc: {cid:1}},    //自增 cid = cid +1
			          function(err, results) {
			            console.log(results);
			            callback(null, results.value.cid);
			          }
			        )
			},
			function(cid,callback){
			  var data = [{cid:cid,bid:bid,com_user:com_user,com_title:com_title,com_conent:com_conent,com_date:com_date,blogAuth:blogAuth}];
			  comment.insert(data,function(err,result){
			  	if (err) {
			  		console.log(err);
			  		return;
			  	}else{
			  		console.log(result);
			  		console.log('发表评论成功');
			  		// res.redirect('/');
			  		db.close();			  		
					res.send(result);			  		
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
				insertData(db);
			}

		})
  // res.render('comment', { title: 'comment',username:req.session.username,userImg:req.session.userImg});
});
router.all('/commentList', function(req, res, next){
	var bid = req.body.bid;
	console.log(bid);
	function findData(db){
		var conn=db.collection('comment');
		conn.find({bid:bid}).toArray(function(err,results){
			if (err) {
				console.log(err);
			}else{
				console.log(results);
				// res.render('comment');
				res.send(results);
			}

		})


	}
	//查询评论
		MongoClient.connect(DB_CONN_STR,function(err,db){
			if (err) {
				console.log(err);
				return;
			}else{
				findData(db);
			}

		})

  // res.render('comment', { title: 'comment',username:req.session.username,userImg:req.session.userImg});
});
module.exports = router;