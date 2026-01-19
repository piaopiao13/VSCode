<template>
  <div class="app">
    <!-- 父组件监听子组件的updateMsg事件 -->
    <UserInfo 
      :username="uname"
      :age="age"
      :is-single="isSingle"
      :car="car"
      :hobbies="hobbies"
    ></UserInfo>

    <hr>

    <BaseProgress 
      :w="progress"
    ></BaseProgress>
    
  </div>
</template>

<script>
import UserInfo from './components/UserInfo.vue'
import BaseProgress from './components/BaseProgress.vue';
export default {
  components: {
    UserInfo,
    BaseProgress
  },
  data() {
    return {
      uname: '张三',
      age: 18,
      isSingle: true,
      car: {
        brand: 'BMW',
        model: 'X5'
      },
      hobbies: ['看书', '旅行', '音乐'],
      progress: 333
    }
  }
}
</script>

<style>
</style>