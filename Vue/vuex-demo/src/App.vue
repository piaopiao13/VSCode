<template>
  <div id="app">
    <h1>根组件 - {{ title }}</h1>
    <button @click="changeTitle('~新的标题~')">修改标题</button>
    <hr>
    <input type="text" :value="count" @input="handleInput" />
    <Son1></Son1>
    <hr />
    <Son2></Son2>
  </div>
</template>

<script>
import Son1 from './components/Son1.vue'
import Son2 from './components/Son2.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'app',
  data: function () {
    return {}
  },
  components: {
    Son1,
    Son2
  },
  created () {
    // // 创建空仓库时（const store = new Vuex.Store()），测试验证用
    // console.log(this.$store)

    // 组件逻辑中访问Vuex中的数据，直接使用this.$store.state.count
    console.log('App.vue', this.$store.state.count)
  },
  computed: {
    ...mapState(['title', 'count'])
  },
  methods: {
    // changeTitle (newTitle) {
    //   this.$store.commit('changeTitle', newTitle)
    // },
    ...mapMutations(['changeTitle']),
    handleInput (evt) {
      // 获取输入框的值
      // console.log(evt.target.value)
      // 提交mutation，修改Vuex中的count值
      this.$store.commit('changeCount', parseInt(evt.target.value) || 0)
    }
  }
}
</script>

<style>
#app {
  width: 600px;
  margin: 20px auto;
  border: 3px solid #ccc;
  border-radius: 3px;
  padding: 10px;
}
</style>
