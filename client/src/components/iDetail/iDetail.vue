<template>
  <div class="article">
    <div class="title">
      <div>
        <span class="h1">{{info.title}}</span>
        <span v-if="author.uname" class="user" @click="detail(author._id)">{{author.uname}}</span>
      </div>
      <span>{{info.create | time}}</span>
    </div>
    <div class="content" v-html="info.conent"></div>
  </div>
</template>
<script>
  import time from '../../util/time'
  export default{
    data(){
      return {
        info: "",
        author:""
      }
    },
    props: {},
    methods: {
      detail(id){
          console.log(id);
          this.$router.push("/udetial/"+id);
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
