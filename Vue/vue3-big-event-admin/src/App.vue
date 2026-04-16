<script setup>
// this在组合式API中不可用
// 使用useRouter获取路由实例对象
// 使用useRoute获取当前路由参数
import { useRouter, useRoute } from 'vue-router'
import { useUserStore, useCounterStore } from '@/stores/index'

const router = useRouter()
const route = useRoute()
console.log(router, route)
const goList = () => {
  router.push('/list')
}

const userStore = useUserStore()
const counterStore = useCounterStore()
</script>

<template>
  <div>
    <router-view></router-view>

    <hr />
    <h1>APP组件页</h1>
    <el-button @click="$router.push('/home')">首页</el-button>
    <el-button @click="goList">列表</el-button>

    <p>{{ userStore.token }}</p>
    <el-button @click="userStore.setToken('sfghjurlu')">登录</el-button>
    <el-button @click="userStore.removeToken">退出</el-button>
    <hr />
    <p>{{ counterStore.count }}</p>
    <el-button @click="counterStore.increment">加1</el-button>
  </div>
</template>

<style scoped></style>
