<template>
  <div>
    <div class="head">
      <div class="head-box">
        <div class="logo">logo</div>
        <div class="nav">
          <router-link to="/">首页</router-link>
          <a href="#">未读消息</a>
          <a href="#">新手入门</a>
          <a href="#">API</a>
          <a href="#">关于</a>
          <a href="#">设置</a>
          <a href="#">登录</a>
        </div>
      </div>
    </div>
    <div class="container">
      <Row type="flex" justify="center" align="top">
        <Col span="16">
        <div>
          <router-view></router-view>
        </div>
        </Col>
        <Col span="4">
        <i-panel></i-panel>
        </Col>
      </Row>
    </div>
    <i-band></i-band>
  </div>
</template>
<script>
  import iBand from '../components/iBand'
  import iPanel from '../components/iPanel'
  export default{
    data(){
      return {}
    },
    props: {},
    methods: {},
    components: {
      iBand, iPanel
    },
    mounted(){

    }
  }
</script>
<style scoped>
  .box {
    width: 500px;
    margin: 0 auto;
  }

  .head {
    width: 100%;
    background: #3B3B3A;
    padding: 12px 0;
  }

  .head-box {
    width: 1000px;
    margin: 0 auto;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
  }

  .nav {
    display: flex;
  }

  .nav a {
    padding: 0 12px;
    color: #cccccc;
  }

  .nav a:hover {
    color: #fff;
  }
  .container{
    margin: 12px auto;
  }
</style>
