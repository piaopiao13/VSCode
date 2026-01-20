<template>
    <!-- 输入框 -->
    <header class="header">
      <h1>Todo List</h1>
      <input placeholder="请输入任务" class="new-todo" v-model="todoName" @keyup.enter="handelAdd" />
      <button class="add" @click="handelAdd">添加任务</button>
    </header>
</template>
<script>
export default {
    data() {
        return {
            todoName: ''
        }
    },
    methods: {
        handelAdd() {
            // 添加任务的逻辑
            // console.log(this.todoName)
            if (this.todoName.trim() === '') {
                // alert('任务名称不能为空')
                return
            }
            this.$emit('add', this.todoName.trim())
            this.todoName = ''
        }
    }
}
</script>
<style>
    
</style>