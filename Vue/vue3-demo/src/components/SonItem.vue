<script setup>
// 借助于“编译器宏”函数接收父组件传递过来的数据
const props = defineProps({
  car: String,
  money: Number,
});

console.log(props);
console.log(props.car);
console.log(props.money);

const emit = defineEmits(["costMoney"]);
const buy = () => {
  // 通过emit方法触发事件
  // 第一个参数：事件名称（自定义）
  // 第二个参数：要传递给父组件的数据（可选）
  emit("costMoney", 1000);
};
</script>

<template>
  <div class="son">
    我是子组件 - {{ car }} - 金额: {{ money }}
    <button @click="buy">花钱</button>
  </div>
</template>

<style scoped>
.son {
  border: 1px solid #000;
  padding: 30px;
}
</style>
