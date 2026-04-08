<script setup>
import CenterItem from "@/components/CenterItem.vue";
import { provide, ref } from "vue";

// 跨层级传递普通数据
provide("theme-color", "pink");

// 跨层级传递响应式数据
const count = ref(100);
provide("count", count);

// 跨层级传递方法
provide("increment", () => {
  count.value++;
});
</script>

<template>
  <h1>顶层组件</h1>
  <CenterItem></CenterItem>
</template>
