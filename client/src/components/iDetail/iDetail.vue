<template>
  <div class="article">
    <div class="title">
      <div>
        <img :src="author.avatar" alt="">
        <span class="h1">{{info.title}}</span>
        <span v-if="author.uname" class="user" @click="detail(author._id)">{{author.uname}}</span>
      </div>
      <span>{{info.create | time}}</span>
    </div>
    <div class="content" v-html="info.conent"></div>
    <div class="comment">
      <div>
        <Input v-model="addAcommnet" type="textarea" :rows="4" placeholder="请输入..."></Input>
        <Button @click="addComment" type="success">成功按钮</Button>
      </div>
      <ul>
        <li v-for="item in comment">
          {{item.content}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import time from '../../util/time'
  export default{
    data(){
      return {
        info: "",
        author:"",
        addAcommnet:"",
        comment:[]
      }
    },
    props: {},
    methods: {
      detail(id){
          console.log(id);
          this.$router.push("/udetial/"+id);
      },
//      添加评论
      addComment(){

      }
    },
    filters:{
      time(value){
          return time(value);
      }
    },
    mounted(){
      let id = this.$route.params.id
      axios.post('/web/admin/article/getArticlesById', {
        articleId: id
      })
        .then((response) => {
          console.log(response);
          this.info = response.data;
          this.author = response.data.author;
        })
    }
  }
</script>
<style scoped>
  .article{
    color: #333;
  }
  .title {
    border-bottom: 1px solid #aaa;
    display: flex;
    justify-content: space-between;
    padding: 5px 20px;
  }
  .h1{
    font-size: 16px;
  }
  .content{
    padding: 20px;
  }
  .user{
    color: #5cadff;
  }
</style>
