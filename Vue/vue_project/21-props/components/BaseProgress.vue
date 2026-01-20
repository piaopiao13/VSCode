<template>
    <div>
        <div class="base-progress">
            <div class="inner" :style="{ width: w + '%' }">
                <span>{{ w }}%</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    // // 基础写法
    // props: {
    //     w: Number
    // }
    
    // 完整写法
    props: {
        w: {
            type: Number,
            // required: true,
            default: 0,
            validator(value) {
                if (value >= 0 && value <= 100) {
                    return true;
                }
                else {
                    console.error('进度值必须在0到100的数字');
                    return false;
                }
            }
        }
    }
}
</script>
<style>
    .base-progress {
        width: 300px;
        height: 24px;
        background-color: #272425;
        border: 3px solid #272425;
        border-radius: 15px;
        overflow: hidden;
    }
    .base-progress .inner {
        height: 100%;
        background-color: #4caf50;
        color: #fff;
        text-align: center;
        line-height: 30px;
        transition: width 0.3s ease;
    }
</style>