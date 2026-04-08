<script setup>
const cnt = 999;
const sayHi = () => {
  console.log("hi");
};

defineExpose({
  cnt,
  sayHi,
});
</script>

<template>
  <div>测试组件 - {{ cnt }}</div>
</template>
