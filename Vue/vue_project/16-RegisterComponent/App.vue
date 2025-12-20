<template>
  <div class="app">
    <!-- 头部组件 -->
    <HomeHeader></HomeHeader>

    <!-- 主体组件 -->
    <HomeMain></HomeMain>

    <!-- 底部组件 -->
    <HomeFooter></HomeFooter>
  </div>
</template>


<script>
// 导入（定义/声明）组件
import HomeHeader from './components/HomeHeader.vue'
import HomeMain from './components/HomeMain.vue'
import HomeFooter from './components/HomeFooter.vue'

export default {
  // 注册组件
  components: {
    // "组件名": 组件对象
    HomeHeader: HomeHeader,
    // 同名的简写方式
    HomeMain,
    HomeFooter
  }
}
</script>


<style>
  .app {
    width: 600px;
    height: 700px;
    background-color: #87ceeb;
    margin: 0 auto;
    padding: 20px;
  }
</style>