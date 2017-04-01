<template>
  <!--设置详情页面-->
  <div class="box">
      <div class="crumb">
        <Breadcrumb>
          <Breadcrumb-item href="/">首页</Breadcrumb-item>
          <Breadcrumb-item href="/components/breadcrumb">个人设置</Breadcrumb-item>
        </Breadcrumb>
      </div>
      <div class="container">
        <Form  :ref="userSetting" :model="user" label-position="right" :label-width="100">
          <Form-item label="用户名">
            <Input v-model="user.uname"></Input>
          </Form-item>
          <Form-item label="电子邮件">
            <Input v-model="user.email"></Input>
          </Form-item>
          <Form-item label="个人头像">
            <div class="avatar"></div>
            <span class="avatar-msg">点击上传头像</span>
          </Form-item>
          <Form-item label="个性签名">
            <Input v-model="user.desc"></Input>
          </Form-item>

          <Form-item>
            <Button type="primary" @click="handleSubmit('userSetting')">保存设置</Button>
          </Form-item>

        </Form>
      </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                user:{}
            }
        },
        props: {},
        methods: {
          handleSubmit (name) {
            this.$refs[name].validate((valid) => {
              if (valid) {
                this.$Message.success('提交成功!');
              } else {
                this.$Message.error('表单验证失败!');
              }
            })
          }
        }
    }
</script>
<style scoped>
.box{
  border: 1px solid #eaeaea;
  padding: 0 10px 10px 10px;
  border-radius: 5px;
  box-shadow: 0 0 2px rgba(0,0,0,.5);
}
  .crumb{
    padding-left: 30px;
    margin: 12px;
  }
  .avatar{
    width: 150px;
    height: 150px;
    border: 1px solid #eee;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: url("./avatar.jpg");
    background-size: 150px;
  }
  .avatar-msg{
    color: #52d7e0;
    font-size: 14px;
  }
</style>
