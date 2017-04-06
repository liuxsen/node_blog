<template>

  <div class="home">
    <Row>
      <Col span="24">
        <ul class="home-title">
          <li>全部</li>
          <li>精华</li>
          <li>分享</li>
          <li>问答</li>
        </ul>
        <ul>
          <li @click="go(item._id)" class="list" v-for="item in lists">
            <div>
              <img class="avatar" :src="item.author.avatar" alt="">
              <span>{{item.title}}</span>
            </div>
            <span>{{item.create | time}}</span>
          </li>
        </ul>
      </Col>
    </Row>
  </div>
</template>
<script>
  import time from '../../util/time'
  export default{
    data(){
      return {
          lists :""
      }
    },
    props: {},
    filters:{
      time(value){
          return time(value);
      }
    },
    methods: {
        go(id){
            this.$router.push('/adetial/'+id);
        }
    },
    mounted(){
      axios.post('/web/admin/article/getArticles')
        .then((response)=>{
          console.log(response);
          this.lists = response.data.articles;
        })
    }
  }
</script>
<style scoped>
  .home{
    margin: 0 100px 0 100px;
    background-color: #FFFFFF;
    padding: 12px;
    border-radius: 8px;
  }
  .avatar{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 12px;
  }
  .list{
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding: 5px 12px;
  }
  .home-title{
    display: flex;
  }
  .home-title li{
    color: #00c261;
    font-size: 14px;
    margin: 0 12px;
  }
</style>
