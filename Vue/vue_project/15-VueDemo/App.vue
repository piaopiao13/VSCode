<template>
  <div id="app">
    <div class="box1">
      <div class="box2" @click="fn"></div>
    </div>
  </div>
</template>

<script>
  // 导出的是当前组件的配置项
  // 里面可以提供 data（特殊）、methods、computes、watch  生命周期八大钩子
  // import HelloWorld from './components/HelloWorld.vue'

export default {
  // name: 'App',
  // components: {
  //   HelloWorld
  // }
  created() {
    console.log('App 创建了')
  },
  methods: {
    fn() {
      alert('点击了小盒子')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.box1 {
  width: 200px;
  height: 200px;
  background-color: lightblue;
  margin: 0 auto;
  position: relative;
}

.box2 {
  width: 100px;
  height: 100px;
  background-color: coral;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
