## 接口文档

## user
 
 返回参数说明	成功返回 0
 
 | param | value | 含义 |
 | ------| ------ | --- |
 | path | /users/add | type post|
 | uname | string | 用户名 |
 | password | sString| 密码 |
 |return| |
 
 
 
 # 头像上传
 
 ## 大法1
 
 前端上传图片到后端，后端返回图片在服务器上的地址
 
 > 前端代码
 
 ```js
 let formdata = new FormData();
 let filed = document.getElementById('file').files[0];
 formdata.append('filed', filed);
// 添加字段userId，数据库用来找user，修改user库中的avatar数据
 formdata.append('userId', localStorage.getItem('token'));
 console.log(filed);
 axios.post('/web/users/editAvatar', formdata)
   .then((res) => {
     //res 返回了服务器上的地址
     this.backgroundImg = 'http://127.0.0.1:3000/' + res.data.data.avatar
   })
 }
```

> nodejs

```js
//用户修改头像
let editAvatar = function (userId, path, callback) {
    async.waterfall([
        function (cb) {
            //    查找用户
            User.findOne({_id: userId})
                .select('avatar')
                .exec(function (err, result) {
                    cb(err, result);
                })
        },
        function (user, cb) {
            user.avatar = path;
            user.save(function (err, result) {
                cb(err, result);
            })
        }
    ], function (err, result) {
        if (err) {
            callback({code: 1005, msg: '用户头像修改失败'})
        } else {
            callback(null,{code: 1006, msg: '用户头像修改成功', data: result});
        }
    })
};

//用户修改头像
router.post('/editAvatar', function (req, res,next) {
    console.log(req.fields);
    let userId = req.fields.userId;
    let fix = req.files.filed.type;
    if(fix =='image/png'){
        fix = 'png';
    }else{
        fix='jpg';
    }
    console.log(req.files.filed);
    let oldPath = req.files.filed.path;
    let newPath = req.files.filed.path+'.'+fix;
    console.log(oldPath,newPath);
    fs.rename(oldPath,newPath,function(err){
        if(err){
            console.log(err);
        }
        let databasePath = path.parse(newPath).base;
        console.log(path.parse(newPath));
        console.log(databasePath);
        editAvatar(userId,databasePath,function(err,result){
            if(err){
                res.send(err);
            }else{
                res.send(result);
            }
        })
    })
});
```


## 大法2

前端上传图片后，将图片转化成base64；提交的时候，将base64的字符串提交到后台

```js
function previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

//监听读取文件完成
  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);
   
  //开始读取操作；
  if (file) {
    reader.readAsDataURL(file);
  }
}
```

