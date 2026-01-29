<template>
  <div>
    <h1>自定义指令</h1>
    <input type="text" ref="inp" v-focus>
    <hr>
    <h1>指令的值</h1>
    <div v-color="color1">内容1</div>
    <div v-color="color2">内容2</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      color1: 'red',
      color2: 'green'
    }
  },
  // mounted() {
  //   this.$refs.inp.focus()
  // }

  // 局部注册自定义指令
  directives: {
    focus: {
      // inserted钩子函数会在指令所绑定的元素被插入到DOM时调用
      inserted (el) {
        // el就是指令所绑定的元素，调用focus方法让其获取焦点
        el.focus()
      }
    },
    color: {
      // el: 指令所绑定的元素
      // binding: 一个对象，包含指令相关的信息
      // binding.value: 指令的值
      inserted (el, binding) {
        // console.log(binding)
        el.style.color = binding.value
      },
      update (el, binding) {
        el.style.color = binding.value
      }
    }
  }
}
</script>
<style>
  
</style>