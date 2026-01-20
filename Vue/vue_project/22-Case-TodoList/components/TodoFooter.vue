<template>
    <!-- 统计和清空 -->
    <footer class="footer">
      <!-- 统计 -->
      <span class="todo-count">合 计:<strong> {{ list.length }} </strong></span>
      <!-- 清空 -->
      <button class="clear-completed" @click="handleClear">
        清空任务
      </button>
    </footer>
</template>
<script>
export default {
    props: {
        list: Array
    },
    methods: {
        handleClear() {
            // 清空任务的逻辑
            this.$emit('clear')
        }
    }
}
</script>
<style>
    
</style>