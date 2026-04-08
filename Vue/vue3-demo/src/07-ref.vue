<script setup>
import { onMounted, ref } from "vue";
import TestItem from "@/components/TestItem.vue";

// 1. 调用ref函数得到ref对象
const h1Ref = ref(null);
const inputRef = ref(null);

// 3. 通过ref对象访问DOM元素，需要通过.value，且必须要渲染之后才能访问到
console.log(h1Ref.value); // null
onMounted(() => {
  console.log(h1Ref.value); // <h1>Hello World</h1>
  inputRef.value.focus();
});

const handleClick = () => {
  inputRef.value.focus();
};

const testRef = ref(null);
const getCom = () => {
  console.log(testRef.value);
};
</script>

<template>
  <!-- 2. 将ref标识绑定ref对象 -->
  <h1 ref="h1Ref">Hello World</h1>

  <div>
    <input type="text" ref="inputRef" />
    <button @click="handleClick">点击聚焦输入框</button>
  </div>
  <TestItem ref="testRef" />
  <button @click="getCom">获取组件</button>
</template>
