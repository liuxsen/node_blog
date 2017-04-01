<template>
    <div class="panel">
        <p>新闻中心</p>
        <p>您可以
          <router-link to="/login">登录</router-link>或
          <router-link to="/reg">注册</router-link>
                    ,也可以
        </p>
      <p>通过 GitHub 登录</p>
    </div>
</template>
<script>
    export default{
        data(){
            return {}
        },
        props: {},
        methods: {}
    }
</script>
<style scoped>
  .panel{
    border-radius: 5px;
    background: #fff;
    padding: 10px;
    border: 1px solid #aaaaaa;
    margin-top: 30px;
    margin-left: 30px;
  }
</style>
