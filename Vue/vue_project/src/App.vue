<template>
  <div class="app" style="background-color: pink;">
    <!-- 父组件监听子组件的updateMsg事件 -->
    <Son :msg="message" @updateMsg="updateMsg"></Son>
  </div>
</template>

<script>
import Son from './components/BaseSon.vue'
export default {
  components: {
    Son,
  },
  data() {
    return {
      message: 'Hello from App.vue'
    }
  },
  methods: {
    // 接收子组件传递的新消息，并更新message，又触发子组件更新（父传子）
    updateMsg(newMsg) {
      this.message = newMsg
    }
  }
}
</script>

<style>
</style>


