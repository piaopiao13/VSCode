<script setup>
import Son1Com from "@/components/Son1Com.vue";
import Son2Com from "@/components/Son2Com.vue";
import { useCounterStore } from "@/stores/counter";
import { useChannelStore } from "@/stores/channel";
import { storeToRefs } from "pinia";
const counterStore = useCounterStore();
const channelStore = useChannelStore();
console.log(counterStore);
// const { count, msg } = counterStore;
const { count, msg } = storeToRefs(counterStore); // 提取属性
const { getChannelList } = channelStore; // 提取方法
</script>

<template>
  <h1>App.vue - {{ counterStore.count }} - {{ counterStore.msg }}</h1>
  <h2>{{ count }} - {{ msg }}</h2>
  <Son1Com />
  <Son2Com />
  <hr />
  <!-- <button @click="channelStore.getChannelList">获取频道数据</button> -->
  <button @click="getChannelList">获取频道数据</button>
  <ul>
    <li v-for="item in channelStore.channelList" :key="item.id">{{ item.name }}</li>
  </ul>
</template>

<style scoped></style>
