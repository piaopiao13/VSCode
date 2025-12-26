<template>
    <div style="border:1px solid red;margin:10px;padding:10px">
        Son: {{ msg }}
        <button @click="handleClick">Click me</button>
    </div>
</template>
<script>
export default {
    props: ['msg'],
    methods: {
        handleClick() {
            // $emit触发事件，通知父组件修改msg
            this.$emit('updateMsg', 'Hello from BaseSon.vue')
        }
    }
}
</script>
<style>
    
</style>