import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/views/login/index.vue') },
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    redirect: '/home',
    children: [
      { path: '/home', component: () => import('@/views/layout/home.vue') },
      { path: '/category', component: () => import('@/views/layout/category.vue') },
      { path: '/cart', component: () => import('@/views/layout/cart.vue') },
      { path: '/user', component: () => import('@/views/layout/user.vue') }
    ]
  },
  { path: '/search', component: () => import('@/views/search/index.vue') },
  { path: '/searchlist', component: () => import('@/views/search/list.vue') },
  {
    path: '/prodetail/:id',
    component: () => import('@/views/prodetail/index.vue')
  },
  { path: '/pay', component: () => import('@/views/pay/index.vue') },
  { path: '/myorder', component: () => import('@/views/myorder/index.vue') }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // 非权限页面
  if (!authUrls.includes(to.path)) {
    next()
  } else {
    // 权限页面 - 判断是否登录
    store.getters.token ? next() : next('/login')
  }
})

export default router
