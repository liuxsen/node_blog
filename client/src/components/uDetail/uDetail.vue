<template>
    <div>
      <ul>
        <li class="list" @click="go(item._id)" v-for="item in lists">
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
                lists:""
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
</style>
