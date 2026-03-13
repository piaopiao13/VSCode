import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')

// js中访问Vuex中的数据，先导入store，再使用
console.log('main.js', store.state.count)
