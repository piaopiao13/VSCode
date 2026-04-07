<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search v-model="search" show-action placeholder="请输入搜索关键词" clearable>
      <template #action>
        <div @click="goSearch(search)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history" v-if="history.length > 0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon @click="clearHistory" name="delete-o" size="16" />
      </div>
      <div class="list">
        <div v-for="item in history" :key="item" class="list-item" @click="goSearch(item)">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistory, setHistory } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      search: '', // 输入框搜索关键词
      history: getHistory() // 搜索历史记录
    }
  },
  methods: {
    goSearch (keyword) {
      if (keyword.trim() === '') {
        this.$toast('请输入搜索关键词')
        return
      }
      // 这里可以添加搜索逻辑，例如跳转到搜索结果页
      // this.$toast(`搜索关键词: ${keyword}`)
      const index = this.history.indexOf(keyword)
      if (index !== -1) {
        this.history.splice(index, 1) // 如 果历史记录中已经存在该关键词，先删除它
      }
      this.history.unshift(keyword) // 将新的搜索关键词添加到历史记录的开头
      setHistory(this.history) // 更新本地存储中的历史记录
      this.$router.push(`/searchlist?search=${keyword}`)
    },
    clearHistory () {
      this.history = [] // 清空搜索历史记录
      setHistory(this.history) // 更新本地存储中的历史记录
      this.$toast.success('清空历史成功')
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
