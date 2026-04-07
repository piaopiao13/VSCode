import { getCartList, updateCartNum, deleteCartGoods } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  getters: {
    // 商品总数量
    cartTotal (state) {
      return state.cartList.reduce((total, item) => total + item.goods_num, 0)
    },
    // 选中的商品
    checkedCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的商品总数量
    checkedCartTotal (state, getters) {
      return getters.checkedCartList.reduce((total, item) => total + item.goods_num, 0)
    },
    // 选中商品的总价
    checkedCartPrice (state, getters) {
      return getters.checkedCartList.reduce((total, item) => {
        return total + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    },
    // 是否全选
    isAllChecked (state, getters) {
      // getters.cartTotal > 0: 避免空车时误判为全选
      return (getters.checkedCartTotal === getters.cartTotal) && (getters.cartTotal > 0)
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    },
    toggleCartChecked (state, id) {
      const goods = state.cartList.find(item => item.goods_id === id)
      if (goods) {
        goods.isChecked = !goods.isChecked
      }
    },
    toggleCartAllChecked (state, wantedChecked) {
      state.cartList.forEach(item => {
        item.isChecked = wantedChecked
      })
    },
    updateCartNum (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      if (goods) {
        goods.goods_num = goodsNum
      }
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      // 后台返回的数据不包含复选框的选中状态
      // 所以在这里给每一项添加一个isChecked属性，默认值为false
      data.list.forEach(item => {
        item.isChecked = false
      })
      context.commit('setCartList', data.list)
    },
    async updateCartNumAction (context, { goodsId, goodsNum, goodsSkuId }) {
      // 如果数据安全性要求不高，可以直接更新state中的数量
      context.commit('updateCartNum', { goodsId, goodsNum })
      // 这里可以调用接口更新购物车数量，接口地址和参数根据实际情况调整
      await updateCartNum(goodsId, goodsNum, goodsSkuId)
      // // 更新成功后重新获取购物车列表数据
      // await context.dispatch('getCartAction')
    },
    async deleteCartSelectedGoodsAction (context) {
      const cartIds = context.getters.checkedCartList.map(item => item.id)
      await deleteCartGoods(cartIds)
      Toast.success('删除成功')
      // 删除成功后重新获取购物车列表数据
      await context.dispatch('getCartAction')
    }
  }
}
