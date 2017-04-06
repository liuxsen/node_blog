<template>
  <div>
    <div class="box">
      <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate2" :label-width="80">
        <Form-item prop="name" label="用户名">
          <Input type="text" v-model="formValidate2.name"></Input>
        </Form-item>
        <Form-item prop="name" label="邮箱">
          <Input type="text" v-model="formValidate2.email"></Input>
        </Form-item>
        <Form-item prop="password" label="密码">
          <Input type="password" v-model="formValidate2.password"></Input>
        </Form-item>
        <Form-item>
          <Button type="primary" @click="handleSubmit('formValidate2')">注册</Button>
        </Form-item>
      </Form>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        showReg: false,
//              注册
        formValidate2: {
          name: "",
          password: "",
          email: ""
        },
        ruleValidate2: {
          name: {required: true, min: 2, message: '至少输入2个数字', trigger: 'change'},
          email: {required: true, min: 6, message: '至少输入6个数字', trigger: 'change'},
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
      register(){
        axios.post('/web/users/add', {
          email: this.formValidate2.email,
          uname: this.formValidate2.name,
          password: this.formValidate2.password
        })
          .then((response) => {
            if (response.data.code === 0) {
              localStorage.setItem('token', response.data.user._id);
              this.$router.push('/setting');
            } else {
              this.$Message.error('用户已经存在');
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
