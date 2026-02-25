import Vue from 'vue'
import VueRouter from 'vue-router'
import Find from '@/views/Find.vue'
import Friend from '@/views/Friend.vue'
import My from '@/views/My.vue'
import Search from '@/views/Search.vue'
import Home from '@/views/Home.vue'
import NotFind from '@/views/NotFind.vue'

// 路由的使用步骤 5 + 2
// 5个基础步骤
// 1. 下载 v3.6.5
// 2. 引入
// 3. 安装注册 Vue.use(Vue插件)
// 4. 创建路由对象
// 5. 注入到new Vue中，建立关联

// 2个核心步骤
// 1. 建组件(views目录)，配规则
// 2. 准备导航链接，配置路由出口(匹配的组件展示的位置) 

Vue.use(VueRouter) // VueRouter插件初始化



const router = new VueRouter({
  // routes 路由规则们
  // route  一条路由规则 { path: 路径, component: 组件 }
  routes: [
    { path: '/find', component: Find },
    { path: '/friend', component: Friend },
    { path: '/my', component: My },
    { name: 'search', path: '/search/:word?', component: Search },
    { name: 'home', path: '/home', component: Home},
    { path: '/', redirect: '/home'},
    { path: '*', component: NotFind }
  ],
//   // 全局配置 <router-link> 默认的激活类名。默认值是 'router-link-active',
//   linkActiveClass: 'active', 
//   // 全局配置 <router-link> 默认的激活类名。默认值是 'router-link-exact-active',
//   linkExactActiveClass: 'exact-active' 
  mode: "history"
})

export default router