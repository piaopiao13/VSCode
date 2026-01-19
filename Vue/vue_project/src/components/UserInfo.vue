<template>
    <div class="userinfo">
        <h3>我的个人信息组件</h3>
        <div>姓名：{{ username }}</div>
        <div>年纪：{{ age }}</div>
        <div>是否单身：{{ isSingle?'是':'否' }}</div>
        <div>座驾：{{ car.brand }}</div>
        <div>
            兴趣爱好：{{ hobbies.join('、') }}
        </div>
    </div>
</template>
<script>
export default {
    props: ['username', 'age', 'isSingle', 'car', 'hobbies'],
}
</script>
<style>
    
</style>