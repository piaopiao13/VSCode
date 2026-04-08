<script setup>
// 父传子
// 1. 父组件中给子组件绑定属性
// 2. 子组件内部通过props选项接收

// 子传父
// 1. 父组件中给子组件标签通过@绑定事件
// 2. 子组件内部通过emit方法触发事件

import { ref } from "vue";
// 局部注册子组件
import SonItem from "@/components/SonItem.vue";

const money = ref(1000);

const getMoney = () => {
  money.value += 1000;
};

const changeMoney = (val) => {
  money.value -= val;
};
</script>

<template>
  <h1>组件通信 - 父传子</h1>
  <p>父组件传递给子组件的金额: {{ money }} <button @click="getMoney">挣钱</button></p>

  <SonItem car="宝马车" :money="money" @costMoney="changeMoney"></SonItem>
</template>
