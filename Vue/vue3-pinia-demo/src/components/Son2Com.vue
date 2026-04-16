<script setup>
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();
</script>

<template>
  <div>
    Son2Com.vue - {{ counterStore.count }} - <button @click="counterStore.subCount">-</button>
  </div>
</template>

<style scoped></style>
