<template>
  <div id="app">
    <BaseA />
    <BaseB />
    <BaseC />
  </div>
</template>

<script>
import BaseA from '@/components/BaseA.vue'
import BaseB from '@/components/BaseB.vue'
import BaseC from '@/components/BaseC.vue'
export default {
  components: {
    BaseA,
    BaseB,
    BaseC
  }
}
</script>

<style>
  .box {
    width: 200px;
    height: 150px;
    padding: 10px;
    margin-top: 10px;
    border: 3px solid #000;
    border-radius: 5px;
    font-size: 20px;
  }
</style>
