<script>
// setup
// 1. 执行时机，比 beforeCreate 还早
// 2. setup函数中获取不到this this=> undefined
// 3. 数据＆ 函数，需要在 setup 中 return 出来，才能在模板中使用
// export default {
//   setup() {
//     console.log("1. setup");

//     // 数据
//     const msg = "Hello Vue 3";

//     // 函数
//     const logMessage = () => {
//       console.log(msg);
//     };

//     // 返回数据和函数，使其在模板中可用
//     return {
//       msg,
//       logMessage,
//     };
//   },
//   beforeCreate() {
//     console.log("2. App beforeCreate");
//   },
// };
//
</script>

// 4. 可以通过setup语法糖简化代码
<script setup>
// 数据
const msg = "Hello Vue 3";

// 函数
const logMessage = () => {
  console.log(msg);
};
</script>

<template>
  <h1>Vue 3 Composition API</h1>
  <p>{{ msg }}</p>
  <button @click="logMessage">click me</button>
</template>
