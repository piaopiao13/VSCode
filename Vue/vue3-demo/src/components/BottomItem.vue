<script setup>
import { inject } from "vue";

const themeColor = inject("theme-color");

const count = inject("count");

const increment = inject("increment");
</script>

<template>
  <h3>底层组件</h3>
  <p>主题色：{{ themeColor }}</p>
  <p>计数: {{ count }} - <button @click="increment">增加</button></p>
</template>
