import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import settings from './modules/settings'

// vuex也是vue的插件, 需要use一下, 进行插件的安装初始化
Vue.use(Vuex)

// // 创建空白仓库 store
// const store = new Vuex.Store()

// 创建一个新的仓库 store
const store = new Vuex.Store({
  // 严格模式 (上线时关闭)
  strict: true,
  // state: 仓库中的状态数据, 也就是存储数据的地方
  state: {
    title: 'Vuex',
    count: 100,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  // mutations: 修改state中的数据的函数, 只能通过mutations中的函数来修改state中的数据
  mutations: {
    // 定义一个函数, 用来修改state中的count数据
    // 注意: mutations中的函数, 第一个参数是state, 代表仓库中的状态数据
    addCount (state, count) {
      state.count += count
    },
    subCount (state, count) {
      state.count -= count
    },
    changeCount (state, newCount) {
      state.count = newCount
    },
    changeTitle (state, newTitle) {
      state.title = newTitle
    }
  },
  // actions 处理异步
  // actions中的函数, 可以包含任意异步操作, 但是不能直接修改state中的数据,
  // 只能通过commit提交mutations中的函数来修改state中的数据
  actions: {
    // context: 上下文对象, 包含了store中的一些属性和方法, 例如: state, commit, dispatch等
    changeCountAsync (context, newCount) {
      // setTimeout模拟一个异步操作, 以后大部分场景都是发请求
      setTimeout(() => {
        // 提交mutations中的函数, 修改state中的数据
        context.commit('changeCount', newCount)
      }, 1000)
    }
  },
  getters: {
    // getters函数的第一个参数是state, 代表仓库中的状态数据
    // getters函数必须要有返回值
    filterList (state) {
      return state.list.filter(item => item > 5)
    }
  },
  modules: {
    user,
    settings
  }
})

// 导出仓库
export default store
