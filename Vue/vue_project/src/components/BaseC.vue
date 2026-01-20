<template>
    <div class="box">
        我是C组件 (接收方)
        <hr>
        {{ msg }}
    </div>
</template>
<script>
import Bus from '@/utils/EventBus.js'
export default {
    data() {
        return {
            msg: ''
        }
    },
    created() {
        // 2. 组件接收消息
        Bus.$on('msgFromA', (msg) => {
            console.log('组件接收到A组件发送的消息：', msg)
            this.msg = msg
        })
    }
}
</script>
<style>
    
</style>