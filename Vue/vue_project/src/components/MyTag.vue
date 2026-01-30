<template>
  <div class="my-tag">
    <input
      v-if="isEdit"
      class="input"
      type="text"
      placeholder="输入标签"
      @blur="isEdit = false"
      v-focus
      :value="value"
      @keyup.enter="handleInput"
    />
    <div v-else class="text" @dblclick="isEdit = true">{{ value }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isEdit: false,
    };
  },
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleInput(e) {
      // console.log(e.target.value);
      if (e.target.value.trim() === "") {
        alert("标签不能为空");
        return;
      }
      this.$emit("input", e.target.value);
      this.isEdit = false;
    },
  },
};
</script>
<style lang="less" scoped>
.my-tag {
  cursor: pointer;
  .input {
    appearance: none;
    outline: none;
    border: 1px solid #ccc;
    width: 100px;
    height: 40px;
    box-sizing: border-box;
    padding: 10px;
    color: #666;
    &::placeholder {
      color: #666;
    }
  }
}
</style>
