import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      // 个人权证相关
      userInfo: getInfo()
    }
  },
  getters: {
  },
  mutations: {
    setUserInfo (state, newUserInfo) {
      state.userInfo = newUserInfo
      setInfo(newUserInfo)
    }
  },
  actions: {
    logoutAction (context) {
      // 个人信息重置
      context.commit('setUserInfo', {})
      // 购物车数据重置 (跨模块)
      context.commit('cart/setCartList', [], { root: true })
    }
  }
}
