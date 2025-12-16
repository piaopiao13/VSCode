// 文件核心作用：导入vue，导入根组件App.vue，创建Vue实例，渲染App组件，并挂载到id为app的DOM元素上。

// 1. 导入Vue核心包
import Vue from 'vue'
// 2. 导入根组件App.vue
import App from './App.vue'

// 提示：当前是处于什么环境，生产环境下需要关闭该提示
Vue.config.productionTip = false

// 3. Vue实例化，提供render方法，基于app.vue创建结构，渲染index.html
new Vue({
  // el: '#app', // 等同于$mount('#app') 用于指定Vue所管理的容器（区域）
  // render 简写
  // render: h => h(App),
  // render完整写法
  render: (createElement) => {
    // 返回通过App组件创建的元素结构
    return createElement(App)
  }
}).$mount('#app')
