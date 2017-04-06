/**
 * Created by liuxsen on 2017/3/30.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let userSchema = new Schema({
    uname: String,//用户名
    password: String,//密码
    avatar: String,//头像
    email: String,//邮箱
    description: String,//个性签名
    articles: [{type: Schema.Types.ObjectId,ref: 'Article'}],
    fans:[{type: Schema.Types.ObjectId,ref:'User'}],
    follow:[{type: Schema.Types.ObjectId,ref:'User'}]
});

let User = mongoose.model('User',userSchema);
module.exports = User;

