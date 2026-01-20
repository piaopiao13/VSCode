<template>
    <div class="box">
        我是A组件 (发送方)
        <hr>
        <button @click="sendNotification">发送通知</button>
    </div>
</template>
<script>
import Bus from '@/utils/EventBus.js'
export default {
    methods: {
        sendNotification() {
            // 3. 组件发送消息 （触发事件）
            Bus.$emit('msgFromA', '你好，这是来自A组件的消息。')
        }
    }
}
</script>
<style>
    
</style>