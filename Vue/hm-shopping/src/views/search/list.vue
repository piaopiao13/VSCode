<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="querySearch || '搜索商品'"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item" @click="getProList()">综合</div>
      <div class="sort-item" @click="getProListBySales()">销量</div>
      <div class="sort-item" @click="getProListByPrice()">价格 </div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import { getProList } from '@/api/product'
import GoodsItem from '@/components/GoodsItem.vue'
export default {
  name: 'ListIndex',
  components: {
    GoodsItem
  },
  data () {
    return {
      page: 1,
      proList: [],
      priceAsc: 1
    }
  },
  computed: {
    querySearch () {
      return this.$route.query.search
    },
    queryCategoryId () {
      return this.$route.query.categoryId
    }
  },
  methods: {
    // 综合排序
    async getProList () {
      const { data: { list } } = await getProList({
        categoryId: this.queryCategoryId,
        goodsName: this.querySearch,
        page: this.page
      })
      this.proList = list.data
      // console.log('getProList', this.proList)
    },
    // 销量排序
    async getProListBySales () {
      const { data: { list } } = await getProList({
        categoryId: this.queryCategoryId,
        goodsName: this.querySearch,
        page: this.page,
        sortType: 'sales'
      })
      this.proList = list.data
      // console.log('getProListBySales', this.proList)
    },
    // 价格排序
    async getProListByPrice () {
      if (this.priceAsc === 1) {
        this.priceAsc = 0
      } else {
        this.priceAsc = 1
      }
      // const res = await getProList({
      const { data: { list } } = await getProList({
        categoryId: this.queryCategoryId,
        goodsName: this.querySearch,
        page: this.page,
        sortType: 'price',
        sortPrice: this.priceAsc
      })
      // console.log(res)
      this.proList = list.data
      // console.log('getProListByPrice', this.proList)
    }
  },
  async created () {
    this.getProList()
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
