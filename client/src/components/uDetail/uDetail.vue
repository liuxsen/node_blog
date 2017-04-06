<template>
    <div class="">
      <div class="main">
        <div class="panel">
          <div class="header">
            <ul class="breadcrumb">
              <li>
                <a href="#">主页</a>
                <span class="divider">/</span>
              </li>
            </ul>
          </div>
          <div class="inner">
            <p class="userinfo">
              <img :src="userInfo.avatar" alt="">
              <span>{{userInfo.uname}}</span>
            </p>

          </div>
        </div>
        <div class="panel">
          <div class="header">
            <ul class="breadcrumb">
              <li>
                <span>最近创建的话题</span>
                <span class="divider">/</span>
              </li>
            </ul>
          </div>
          <div class="inner">
            <ul>
              <li class="list" @click="go(item._id)" v-for="item in lists">
                <span>{{item.title}}</span>
                <span>{{item.create | time}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import time from '../../util/time'
    export default{
        data(){
            return {
                lists:"",
              userInfo:{}
            }
        },
        props: {},
        methods: {
            go(id){
                this.$router.push('/adetial/'+id);
            }
        },
      filters:{
        time(value){
            return time(value);
        }
      },
      mounted(){
            let id = this.$route.params.id;
            axios.post('/web/admin/article/getUserArticles',{
                userId:id
            }).then((response)=>{
                console.log(response);
                this.lists = response.data.data.articles;
                this.userInfo = response.data.data;
            })
      }
    }
</script>
<style scoped>
.list{
  display: flex;
  padding: 8px 20px;
  border-bottom: 1px solid #eee;
  justify-content: space-between;
}
.userinfo{
  font-size: 14px;
}
.userinfo img{
  vertical-align: middle;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.panel{
  margin-top: 30px;
}
  .main{
    width: 90%;
    margin: 12px auto 0;
  }
  .breadcrumb a{
    color: #00c261;
  }
  .header{
    background-color: #eeeeee;
    padding: 12px;
  }
  .panel{
    background-color: #FFFFFF;
    border-radius: 12px;
  }
.inner{
  background-color: #FFFFFF;
  padding: 12px;
  border-radius: 12px;
}
</style>
