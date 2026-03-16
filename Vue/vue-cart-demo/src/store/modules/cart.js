import axios from 'axios'
export default {
  namespaced: true,
  state () {
    return {
      // 购物车数据
      list: []
    }
  },
  getters: {
    // 商品总数量
    total (state) {
      return state.list.reduce((sum, item) => sum + item.count, 0)
    },
    // 商品总价
    totalPrice (state) {
      return state.list.reduce((sum, item) => sum + item.count * item.price, 0)
    }
  },
  mutations: {
    updateList (state, newList) {
      state.list = newList
    },
    updateCount (state, { id, count }) {
      const item = state.list.find(item => item.id === id)
      item.count = count
    }
  },
  actions: {
    async getList (context) {
      const res = await axios.get('http://localhost:3000/cart')
      // console.log(res)
      context.commit('updateList', res.data)
    },
    async updateCountAsync (context, { id, count }) {
      // 后台更新
      await axios.patch(`http://localhost:3000/cart/${id}`, {
        count: count
      })
      // 前台更新
      context.commit('updateCount', {
        id: id,
        count: count
      })
    }
  }
}
