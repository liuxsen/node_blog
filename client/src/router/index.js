import Vue from 'vue'
import Router from 'vue-router'
import iLogin from '../components/iLogin'
import iReg from '../components/iReg'
import iHome from '../components/iHome'
import iCreate from '../components/icreate'
import iDetail from '../components/iDetail'
import uDetail from '../components/uDetail'
import Admin from '../views/Admin'
import setting from '../views/setting/setting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Admin,
      children:[
        {
          path:'create',
          component: iCreate
        },
        {
          path:'login',
          component:iLogin
        },
        {
          path:'reg',
          component:iReg
        },
        {
          path:'',
          component: iHome
        },
        {
          path:'/adetial/:id',//文章详情
          component: iDetail
        },
        {
          path:'/udetial/:id',//用户详情
          component: uDetail
        },
        {
          path:'/setting',
          component: setting
        }
      ]
    },

  ]
})
