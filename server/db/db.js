/**
 * Created by liuxsen on 2017/3/30.
 */
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');

let User = require('./User');
let Article = require('./Article');

//新创建一个用户

/*let user = new User({
    uname: '张三',
    avatar: '老师肯定积分',
    description: '水电费水电费',
});

user.save();*/

// 指定用户新添加一个文章
/*User.findOne({uname:"hah"},function(err,result){
    let article = new Article({
        title: '第一篇文章',
        conent: '可是地方开始',
        author: result._id
    });
    article.save();
    result.articles.push(article);
    result.save();
});*/

//列出指定用户下面的所有的文章
/*User.findOne({uname:'hah'})
    .populate('articles')
    .exec(function(err,articles){
        console.log(articles)
    });*/

// 粉丝一个用户
/*User.findOne({uname:'hah'},function(err,res1){
    User.findOne({uname:"张三"},function(err,res2){
        res2.fans.push(res1._id);
        //增加粉丝
        res2.save();
        //给自己增加关注的人物
        res1.follow.push(res2._id);
        res1.save();
    })
});*/

//查询用户带上粉丝
User.findOne({uname:"张三"})
    .populate('fans')
    .populate('follow')
    .exec(function(err,res){
        console.log(res);
    })

