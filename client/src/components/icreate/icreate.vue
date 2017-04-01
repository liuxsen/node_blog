<template>
  <div>
    <div class="box">
      <div class="layout-breadcrumb">
        <Breadcrumb>
          <Breadcrumb-item href="#">首页</Breadcrumb-item>
          <Breadcrumb-item href="#">发布话题</Breadcrumb-item>
        </Breadcrumb>
      </div>
      <div class="list">
        <Select v-model="type" style="width:200px">
          <Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="list">
        <Input type="text" placeholder="标题字数10字以上" v-model="article.title"></Input>
      </div>
      <div class="list">

        <vue-editor
          :use-save-button="false"
          @editor-updated="handleUpdatedContent">
        </vue-editor>
      </div>
      <div class="list">
        <Button type="primary" @click="addArticle">提交</Button>
      </div>
    </div>
  </div>
</template>
<script>
  import { VueEditor } from 'vue2-editor'
  export default{
    data(){
      return {
        article: {
          title: "",
          content: ""
        },
        cityList: [
          {
            value: '0',
            label: '分享'
          },
          {
            value: '1',
            label: '问答'
          }
        ],
        type: ''
      }
    },
    props: {},
    methods: {
      addArticle(){
        axios.post("/web/admin/article/add", {
          token: localStorage.getItem('token'),
          title: this.article.title,
          content: this.article.content,
          type: this.type
        })
          .then((response) => {
            this.$Message.success('创建文章成功!');
          })
      },
      handleUpdatedContent: function (value) {
        this.article.content = value
      }
    },
    components:{
      VueEditor
    }
  }
</script>
<style scoped>
.list{
  margin: 8px 0;
}
.save-button{
  color: #fff;
  padding: .5em 1em;
  background-color: rgba(53, 73, 94, 0.85);
  text-decoration: none;
  border-radius: 2px;
  cursor: pointer;
  font-weight: 900;
  transition: background-color .2s ease;
  margin: 1em 0;
  float: right;
}

.save-button:hover {
  background-color: #35495e;
}
</style>
