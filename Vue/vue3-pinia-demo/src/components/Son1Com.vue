<script setup>
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();
</script>

<template>
  <div>
    Son1Com.vue - {{ counterStore.count }} - {{ counterStore.doubleCount }} -
    <button @click="counterStore.addCount">+</button>
  </div>
</template>

<style scoped></style>
