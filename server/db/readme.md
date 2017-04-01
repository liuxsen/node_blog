## blog

> article

+ 文章标题 title String
+ 文章发表时间 createTime Data
+ 文章是否置顶        Boolean
+ 文章是否为热门
+ 文章发表作者 author **关联表** user表
+ 文章评论表 Array 

```js
[
   {
      author: userId,
      content:"....",
      createTime: '2017-11-01 10:01',
      ding: [
          userId
       ]
    }
];
```

> user 表

```js
{
    uName: String,
    avatar: String,
    description: String,
    fen: [
        userId
    ],
    articles:[
        articleId
    ]
}
```

> article 表

```js
{
    title: String,
    create: new Date(),
    conent: String,
    author: userId
    
}
```
























