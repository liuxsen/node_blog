/**
 * Created by liuxsen on 2017/3/30.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let userSchema = new Schema({
    uname: String,
    password: String,
    avatar: String,
    description: String,
    articles: [{type: Schema.Types.ObjectId,ref: 'Article'}],
    fans:[{type: Schema.Types.ObjectId,ref:'User'}],
    follow:[{type: Schema.Types.ObjectId,ref:'User'}]
});

let User = mongoose.model('User',userSchema);
module.exports = User;

