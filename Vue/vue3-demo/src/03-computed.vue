<script setup>
import { ref, computed } from "vue";

// 声明数据
const list = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// 计算属性
const conputedList = computed(() => {
  return list.value.filter((item) => item > 2);
});
</script>

<template>
  <p>原始数据：{{ list }}</p>
  <p>计算后的数据：{{ conputedList }}</p>
</template>
