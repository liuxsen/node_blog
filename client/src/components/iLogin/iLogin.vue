<template>
  <div>

    <div class="box">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item prop="name" label="账号">
          <Input type="text" v-model="formValidate.name"></Input>
        </Form-item>
        <Form-item prop="password" label="密码">
          <Input type="password" v-model="formValidate.password"></Input>
        </Form-item>
        <Form-item>
          <Button type="primary" @click="handleSubmit('formValidate')">登录</Button>
        </Form-item>
      </Form>
    </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        showReg: false,
        formValidate: {
          name: "",
          password: ""
        },
        ruleValidate: {
          name: {required: true, min: 6, message: '至少输入6个数字', trigger: 'change'},
          password: {required: true, min: 6, message: '至少输入6个数字', trigger: 'change'},
        }
      }
    },
    props: {},
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
//                  注册
            if (name === "formValidate2") {
              this.register();
            }
//                  登录
            if (name === "formValidate") {
              this.login();
            }
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
//          登录操作
      login(){
        axios.post('/web/users/login', {
          uname: this.formValidate.name,
          password: this.formValidate.password
        })
          .then((response) => {
            if (response.data.code === 0) {
              localStorage.setItem('token', response.data.user._id);
              this.$router.push('/admin');
            } else {
              this.$Message.error('用户名或者密码错误！');
            }
          })
      }
    },
    mounted(){
      console.log(1)

    }
  }
</script>
<style scoped>
  .box {
    width: 500px;
    height: 400px;
    borde: 1px solid #eee;
    margin: 100px auto 0;
  }
</style>
