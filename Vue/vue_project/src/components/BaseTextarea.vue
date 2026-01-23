<template>
    <div class="box">
        <textarea name="" id="" placeholder="请输入文本" :value="value" @input="$emit('input', $event.target.value)">
        </textarea>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        }
    }
}
</script>
<style scoped>
    textarea {
        width: 100%;
        height: 150px;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        resize: vertical;
    }
</style>