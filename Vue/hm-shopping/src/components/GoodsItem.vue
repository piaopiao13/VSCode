<template>
  <div v-if="item.goods_name" class="goods-item" @click="$router.push(`/prodetail/${item.goods_id}`)">
    <div class="left">
      <img :src="item.goods_image" alt="" />
    </div>
    <div class="right">
      <p class="tit text-ellipsis-2">
        {{ item.goods_name }}
      </p>
      <p class="count">已售{{ item.goods_sales }}件</p>
      <p class="price">
        <span class="new">¥{{ item.goods_price_min }}</span>
        <span class="old">¥{{ item.goods_price_max }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsItem',
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          goods_id: 10038,
          goods_name: '三星手机 SAMSUNG Galaxy S23 8GB+256GB 超视觉夜拍系统 超清夜景 悠雾紫 5G手机 游戏拍照旗舰机s23',
          selling_point: '',
          goods_image: 'http://smart-shop.itheima.net/uploads/10001/20230321/8f505c6c437fc3d4b4310b57b1567544.jpg',
          goods_price_min: '3999.00',
          goods_price_max: '6699.00',
          line_price_min: '6699.00',
          line_price_max: '6699.00',
          goods_sales: 104
        }
      }
    }
  }

}
</script>

<style lang="less" scoped>
.goods-item {
  height: 148px;
  margin-bottom: 6px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  .left {
    width: 127px;
    img {
      display: block;
      width: 100%;
    }
  }
  .right {
    flex: 1;
    font-size: 14px;
    line-height: 1.3;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .count {
      color: #999;
      font-size: 12px;
    }
    .price {
      color: #999;
      font-size: 16px;
      .new {
        color: #f03c3c;
        margin-right: 10px;
      }
      .old {
        text-decoration: line-through;
        font-size: 12px;
      }
    }
  }
}
</style>
