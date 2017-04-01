let express = require('express');
let router = express.Router();
let User = require('../db/User');
let async = require('async');

let addUser = function(person,callback){
    console.log(person);
    async.waterfall([
       // 查看是否有这个用户
       function(cb){
           User.findOne({uname:person.uname},function(err,user){
               if(user){
                   cb("用户已经存在")
               }else{
                   cb(null,user)
               }
           })
       },
        //添加用户
        function(user,cb){
            let currentUser = new User(person);
            currentUser.save(function(err,user){
                cb(err,user);
            });
        }
    ],function(err,result){
        callback(err,result);
    })
};


// 添加用户
router.post('/add', function(req, res, next) {
    // res.send('respond with a resource');
    addUser(req.body,function(err,person){
        if(err){
            res.send({code: 1000,msg: '添加用户失败'})
        }else{
            res.send({code:0,msg:'添加用户成功',user:person});
        }
    });
});

/* 用户登录 */
let login = function(person,callback){
    console.log("----------")
    console.log(person);
    async.waterfall([
        function(cb){
            // 查看是否有这个用户
            User.findOne({uname:person.uname},function(err,user){
                if(err){
                    cb({code: 1000,msg:"查询失败"})
                }else if(user){
                    if(user.password === person.password){
                        cb(null,{code: 0,msg:'用户登录成功',user:user})
                    }else{
                        cb({code: 1001,msg:"用户密码不正确"})
                    }
                }else if(err===null && user===null){
                    cb({code: 1002,msg: "没有当前用户"});
                }
            })
        }
    ],function(err,user){
        if(err){
            callback(err);
        }else{
            callback(null,user);
        }
    })
}

/* 用户登录 */
router.post('/login', function(req, res, next) {
    login(req.body,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
});


module.exports = router;
