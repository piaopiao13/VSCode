<!-- <script setup>
// 导入
import { reactive } from 'vue'

// 定义响应式数据
const state = reactive({
  count: 100,
});

console.log(state.count) // 100
console.log(state)

const addCount = () => {
  state.count++
};
</script> 

<template>
  <p>Count: {{ state.count }}</p>
  <button @click="addCount">+1</button>
</template> -->

<script setup>
import { ref } from "vue";
const count = ref(100);

console.log(count.value); // 100
console.log(count);
const addCount = () => {
  count.value++;
};
</script>

<template>
  <p>Count: {{ count }}</p>
  <button @click="addCount">+1</button>
</template>
