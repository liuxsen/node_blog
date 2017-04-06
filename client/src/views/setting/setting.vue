<template>
  <Row type="flex" justify="space-around">
    <Col span="15" class="setting-box">
    <div class="box">
      <!--设置详情页面-->
      <div class="crumb">
        <Breadcrumb>
          <Breadcrumb-item href="/">首页</Breadcrumb-item>
          <Breadcrumb-item href="/components/breadcrumb">个人设置</Breadcrumb-item>
        </Breadcrumb>
      </div>
      <div class="container">
        <Form :ref="userSetting" :model="user" label-position="right" :label-width="100">
          <Form-item label="用户名">
            <Input v-model="user.uname" disabled></Input>
          </Form-item>
          <Form-item label="电子邮件">
            <Input v-model="user.email"></Input>
          </Form-item>
          <Form-item label="个人头像">
            <div class="avatar" :style="bg">
              <input @change="upload" type="file" id="file">
            </div>
            <span class="avatar-msg">点击上传头像</span>
          </Form-item>
          <Form-item label="个性签名">
            <Input v-model="user.desc"></Input>
          </Form-item>
          <Form-item>
            <Button type="primary" @click="userSetting">保存设置</Button>
          </Form-item>

        </Form>
      </div>
    </div>
    </Col>
    <Col span="6">
    <div class="info-box">
      <p class="title-box">
        个人信息

      </p>
      <div class="user-info-content">
        <img class="user-info-avatar" :src="backgroundImg" alt="">
        <span class="user-info-name">{{user.uname}}</span>
        <div class="user-info-desc">
          <p v-if="!user.desc">这个家伙很懒，什么个性签名都没有留下</p>
          <p v-if="user.desc">{{user.desc}}</p>
        </div>
      </div>
    </div>

    <div class="add-article">
      <Button type="info" @click="addArticle">添加文章</Button>
    </div>
    </Col>
  </Row>

</template>
<script>
  export default{
    data(){
      return {
        user: {
          email: '',
          desc: '',
          uname: ''
        },
        backgroundImg: require('./avatar.jpg')
      }
    },
    computed: {
      bg(){
        return {
          'background-image': "url(" + this.backgroundImg + ")"
        }
      }
    },
    props: {},
    methods: {
      handleSubmit (name) {
        console.log(1);
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      addArticle(){
        this.$router.push('/create')
      },
      upload(){
        let file = document.getElementById('file').files[0];
        let reader = new FileReader();
        reader.addEventListener('load', () => {
          console.log(reader.result);
          this.backgroundImg = reader.result;
        }, false);
        if (file) {
          reader.readAsDataURL(file);
        }
      },
      userSetting(){
        console.log(1);
        console.log(localStorage.getItem('token'));
        axios.post('/web/users/updatainfo', {
          userId: localStorage.getItem('token'),
          email: this.user.email,
          desc: this.user.desc,
          avatar: this.backgroundImg
        })
          .then((result) => {
            this.$Message.warning('修改数据成功', 10);
            console.log(result);
          })
      }
    },
    mounted(){
      axios.post('/web/users/getinfo', {
        userId: localStorage.getItem('token')
      })
        .then((res) => {
          console.log(res);
          this.user.email = res.data.email;
          this.backgroundImg = res.data.avatar;
          this.user.desc = res.data.description;
          this.user.uname = res.data.uname;
        })
    }
  }
</script>
<style scoped>
  .box {
    padding: 0 10px 10px 10px;
    border-radius: 5px;
    width: 600px;
  }

  .crumb {
    padding-left: 30px;
    margin: 12px;
  }

  .avatar {
    width: 150px;
    height: 150px;
    border: 1px solid #eee;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: 150px;
    overflow: hidden;
    cursor: pointer;
  }

  .avatar-msg {
    color: #52d7e0;
    font-size: 14px;
  }

  #file {
    display: block;
    font-size: 0;
    padding: 0;
    padding: 150px 0 0 150px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .setting-box {
    background-color: #FFFFFF;
  }

  .info-box {
    background-color: #FFFFFF;
    height: 200px;
    border-radius: 5px;
  }

  .title-box {
    padding: 12px;
    background-color: #f9f9f9;
    margin-bottom: 12px;
  }

  .user-info-avatar {
    width: 50px;
    height: 50px;
    vertical-align: middle;
  }

  .user-info-name {
    margin-left: 5px;
    font-size: 14px;
  }

  .user-info-content {
    padding: 12px;
  }

  .user-info-desc {
    margin-top: 30px;
    font-size: 14px;
  }

  .add-article {
    border-radius: 8px;
    padding: 12px;
    background-color: #FFFFFF;
    margin-top: 30px;
  }
</style>
