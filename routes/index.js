var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var async = require('async');
var MongoClient = mongodb.MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/blog';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
         title: 'index',
         username:req.session.username ,
         userImg:req.session.userImg,
      
        

      });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' });
});
router.get('/registor', function(req, res, next) {
  res.render('registor', { title: 'registor' ,result:req.session.result});
});
router.get('/logout', function(req, res, next) {
	req.session.username=undefined;	
  res.redirect('/');
});
// router.get('/list', function(req, res, next) {
//   res.render('list', { title: 'list' ,resData:results[1]});
// })
router.all('/list',function(req,res,next){
	var pageNow = req.body['pageNow'] || 1; //当前第x页
	 // var pageNow=req.body.pageNow||1;
     var totalPage=0;//共几页
     var pageSize=5;//每页放5条数据
     var count=0;//共多少条数据

function findData(db) {
    var conn = db.collection('blogCon');
    //串行无关联，第一次查询所有的数据，将数据的条数付给count，页数也给totalPage
    //第二此查询将数据倒序排列是最新的评论在最前面，并显示相应的条数
    async.series([
     	function(callback){
     		conn.find().toArray(function(err,results){
			if (err) {
				console.log(err);
				return;
			}else{
				console.log(results);
				 count=results.length;
				 totalPage=Math.ceil(count/5);
				 pageNow=pageNow>=totalPage?totalPage:pageNow;
				  pageNow=pageNow<1?1:pageNow;
				   callback(null,''); 
				// res.render('list',{title:'list',resData:results,username:req.session.username,userImg:req.session.userImg});
			}
			
		})
     	},
     	function(callback){
     		//skip:从第几条开始显示数据, limit:显示多少条数据
     		conn.find().sort({_id:-1}).skip((pageNow-1)*5).limit(pageSize)
     		.toArray(function(err,results){
     			console.log(results);

     			callback(null,results);

     		});
     	}
     ],function(err,results){
      var obj={
        resData:results[1],
        pageNow:pageNow,
        totalPage:totalPage,
        count:count,

      }
      res.send(obj);

     	// res.render('index', {
      //    title: 'list',
      //    username:req.session.username ,
      //    userImg:req.session.userImg,
     	// 	
     	// 	
     	// 	
     	// 	
     		

     	// });

     })

   
  }
	MongoClient.connect(DB_CONN_STR,function(err,db){
		if (err) {
			console.log(err);
			return;
		}else{
			findData(db)
		}

	})

})

//=========查询博客详情===========
router.get('/detail', function(req, res, next) {
	var bid=parseInt(req.query['bid']);
  console.log(bid);
  function findData(db){
  	var conn = db.collection('blogCon');
  	 conn.findOne({bid:bid},function(err,item){
  	 	console.log(item);
  	 	res.render('detail', {
  	 		title:"detail",
  	 		item:item,
  	 		username:req.session.username,
     		userImg:req.session.userImg,
     	

  	 });


  })
 }
   MongoClient.connect(DB_CONN_STR, function(err, db) {
      if(err) {
        console.log(err);
        return;
      } else {
      	// db.collection('comment').findOne({cid:cid},)
      	console.log('数据库连接成功');
        findData(db)
      }
    })
	
});
module.exports = router;
