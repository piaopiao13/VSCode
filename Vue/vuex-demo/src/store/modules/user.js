const state = {
  userInfo: {
    name: 'zs',
    age: 18
  }
}
const mutations = {
  setUser (state, newUserInfo) {
    state.userInfo = newUserInfo
  }
}
const actions = {
  setUserLater (context, newUserInfo) {
    // context 上下文，即本模块
    setTimeout(() => {
      context.commit('setUser', newUserInfo)
    }, 1000)
  }
}
const getters = {
  // 分模块之后，state就不再是整个仓库中的状态数据了，而是当前模块中的状态数据
  UpperCaseName (state) {
    return state.userInfo.name.toUpperCase()
  }
}
export default {
  namespaced: true, // 开启命名空间, 让这个模块成为一个独立的模块
  state,
  mutations,
  actions,
  getters
}
