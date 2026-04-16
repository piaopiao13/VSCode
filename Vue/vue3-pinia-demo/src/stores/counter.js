import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore(
  "counter",
  () => {
    const count = ref(0);
    const doubleCount = computed(() => count.value * 2);
    function addCount() {
      count.value++;
    }
    const subCount = () => {
      count.value--;
    };

    const msg = ref("Hello Pinia!");

    return { count, doubleCount, addCount, subCount, msg };
  },
  {
    // persist: true, // 开启持久化
    persist: {
      key: "counterStore", // 存储的key，默认为当前store的id
      path: ["count"], // 需要持久化的数据路径，默认为整个store
    },
  },
);
