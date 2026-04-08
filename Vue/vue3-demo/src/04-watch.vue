<script setup>
import { ref, watch } from "vue";

const count = ref(0);

const incrementCount = () => {
  count.value++;
};

// 1. 监视单个数据的变化
//    watch(ref对象, (newValue, oldValue) => { ... })
watch(count, (newValue, oldValue) => {
  console.log(`count changed from ${oldValue} to ${newValue}`);
});

// 2. 监视多个数据的变化
//    watch([ref对象1, ref对象2], (newArr, oldArr) => { ... })
const count2 = ref(0);
const nickname = ref("Vue3");
const incrementCount2 = () => {
  count2.value++;
};
const changeNickname = () => {
  nickname.value = nickname.value === "Vue3" ? "Vue.js" : "Vue3";
};
watch([count2, nickname], (newArr, oldArr) => {
  console.log(`count2 changed from ${oldArr[0]} to ${newArr[0]}`);
  console.log(`nickname changed from ${oldArr[1]} to ${newArr[1]}`);
});

// 3. immediate 立刻执行
const count3 = ref(0);
const incrementCount3 = () => {
  count3.value++;
};
watch(
  count3,
  (newValue, oldValue) => {
    console.log(`count3 changed from ${oldValue} to ${newValue}`);
  },
  { immediate: true },
);

// 4. deep 深度监视（监视对象内部的变化）
const userInfo = ref({
  name: "zs",
  age: 18,
});
const changeUserInfo = () => {
  userInfo.value.name = userInfo.value.name === "zs" ? "ls" : "zs";
  userInfo.value.age = userInfo.value.age === 18 ? 20 : 18;
};
watch(
  userInfo,
  (newValue, oldValue) => {
    console.log("userInfo changed");
    console.log("oldValue: ", oldValue);
    console.log("newValue: ", newValue);
    // 注意：在嵌套的变更中，
    // 只要没有替换对象本身，
    // 那么这里的 `newValue` 和 `oldValue` 相同
  },
  { deep: true },
);

// 5. 对于对象中的单个属性，进行监视
const userInfo2 = ref({
  name: "zs",
  age: 18,
});
const changeUserInfo2 = () => {
  userInfo2.value.name = userInfo2.value.name === "zs" ? "ls" : "zs";
};
watch(
  () => userInfo2.value.name,
  (newValue, oldValue) => {
    console.log(`userInfo2.name changed from ${oldValue} to ${newValue}`);
  },
);
</script>

<template>
  <div>
    {{ count }} -
    <button @click="incrementCount">+1</button>
  </div>
  <hr />
  <div>
    {{ count2 }} -
    <button @click="incrementCount2">+1</button>
    <br />
    {{ nickname }} -
    <button @click="changeNickname">Change Nickname</button>
  </div>
  <hr />
  <div>
    {{ count3 }} -
    <button @click="incrementCount3">+1</button>
  </div>
  <hr />
  <div>
    {{ userInfo }} -
    <button @click="changeUserInfo">Change User Info</button>
  </div>
  <hr />
  <div>
    {{ userInfo2 }} -
    <button @click="changeUserInfo2">Change User Info 2</button>
  </div>
</template>
