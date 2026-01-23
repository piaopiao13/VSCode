<template>
  <div id="app">
    <BaseTextarea v-model="msg" />
  </div>
</template>

<script>
import BaseTextarea from '@/components/BaseTextarea.vue'
export default {
  components: {
    BaseTextarea,
  },
  data() {
    return {
      msg: ''
    }
  }
}
</script>

<style>

</style>
