<template>
  <div class="home">
   <ul>
     <li @click="go(item._id)" class="list" v-for="item in lists">
       <span>{{item.title}}</span>
       <span>{{item.create | time}}</span>
     </li>
   </ul>
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
  .list{
    border-bottom: 1px solid #eee;
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
</style>
