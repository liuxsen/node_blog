/**
 * Created by liuxsen on 2017/3/30.
 */
let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let User = mongoose.model("User");
let Article = require('../db/Article');
let async = require('async');

//用户添加文章函数
let addArticle = function (article, callback) {
    async.waterfall([
        //    查找用户
        function (cb) {
            User.findOne({_id: article.token}, function (err, user) {
                if(err){
                    cb({code:'1005',msg:'用户没有登录'})
                }else{
                    cb(null, user);
                }
            })
        },
        //    当前用户添加文章
        function (user, cb) {
            //   创建一篇文章
            let tempArticle = new Article({
                title: article.title,
                conent: article.content,
                type: article.type,
                author: user._id
            });
            tempArticle.save(function (err, result) {
                if (err) {
                    cb({code: 1003, msg: "创建文章失败"})
                } else {
                    user.articles.push(result._id);
                    user.save(function (err, result) {
                        if (err) {
                            cb({code: 1004, msg: '用户创建文章失败'})
                        } else {
                            cb(null, {code: 0, msg: '用户创建文章成功'});
                        }
                    })
                }
            });
        }
    ], function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
};

router.post('/add', function (req, res) {
    console.log("add article");
    console.log(req.body);
    addArticle(req.body, function (err, result) {
        console.log(err,result);
        res.send(result);
    });
});

//获取所有的文章
let getArticles = function(callback){
    async.waterfall([
        function(cb){
            Article.find({})
                .sort({create: -1})
                //.populate('author','-password -articles -follow -fans')
                .populate({
                    path:'author',
                    select:{uname:1,_id:1} //1表示填充， 0 表示不填充
                })
                .exec(function(err,results){
                    if(err){
                        cb({code: 1005,msg:'查找所有的文章失败'})
                    }else{
                        cb({code: 0,articles:results});
                    }
                })
        }
    ],function(err,results){
        callback(err,results);
    })
};
router.post('/getArticles',function(req,res){
    getArticles(function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    });
});

//获取文章详情
let getArticleById = function(id,callback){
  async.waterfall([
      function(cb){
          Article.findOne({_id:id})
              .populate({
                  path: 'author',
                  select:{
                      uname: 1
                  }
              })
              .exec(function(err,result){
                  cb(err,result);
              })
      }
  ],function(err,result){
      callback(err,result);
  })
};
//获取文章详情
router.post('/getArticlesById',function(req,res){
    console.log(req.body.articleId);
    getArticleById(req.body.articleId,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
});

let getUserArticles = function(userId,callback){
    async.waterfall([
        //查找用户
        function(cb){
            User.findOne({_id:userId})
                .select({
                    password: 0
                })
                .populate({
                    path: 'articles',
                })
                .exec(function(err,results){
                    if(err){
                        cb({code: 1006,msg:'查找文章失败'})
                    }else{
                        cb(null,{code:0,data:results});
                    }
                })
        }
    ],function(err,results){
        callback(err,results);
    })
};
router.post('/getUserArticles',function(req,res){
    getUserArticles(req.body.userId,function(err,results){
        if(err){
            res.send(err);
        }else{
            res.send(results);
        }
    })
})


module.exports = router;