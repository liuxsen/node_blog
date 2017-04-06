/**
 * Created by liuxsen on 2017/3/30.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let articleSchema = new Schema({
    title: String,
    create: { type: Number, default: (new Date()).getTime() },
    conent: String,
    comment:Array,
    type: Number, // 0 分享 1 问答
    author: {type: Schema.Types.ObjectId,ref:'User'}
},{ timestamps: true });

let Article = mongoose.model('Article',articleSchema);

module.exports = Article;
