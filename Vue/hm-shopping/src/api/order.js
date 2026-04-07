import request from '@/utils/request'

// 订单结算接口
// mode: cart => obj: cartIds
// mode: buy  => obj: goodsId goodsNum goodsSkuId
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 10, // 10快递配送 20上门自提
      shopId: 0,
      couponId: 0, // 不使用优惠券
      isUsePoints: 0, // 不使用积分
      ...obj
    }
  })
}

// 提交订单
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10, // 物流方式  配送方式 (10快递配送 20门店自提)
    couponId: 0, // 优惠券 id
    payType: 10, // 余额支付
    isUsePoints: 0, // 是否使用积分
    ...obj
  })
}

// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
