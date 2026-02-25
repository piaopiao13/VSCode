<template>
  <div>
    <h2>搜索页</h2>
    <p>搜索关键字（查询参数）：{{ $route.query.key }}</p>
    <p>搜索关键字（动态路由）：{{ $route.params.word }}</p>
    <p>搜索结果</p>
  </div>
</template>

<script>
export default {
  name: 'SearchResult'
}
</script>

<style>

</style>