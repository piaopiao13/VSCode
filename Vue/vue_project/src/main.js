import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// //全局注册自定义指令
// Vue.directive('focus', {
//   // inserted钩子函数会在指令所绑定的元素被插入到DOM时调用
//   inserted(el) {
//     // el就是指令所绑定的元素，调用focus方法让其获取焦点
//     el.focus()
//   }
// })

new Vue({
  render: h => h(App),
}).$mount('#app')
