<template>
  <div class="box">
    <h2>Son1 子组件</h2>
    <!-- 模板中访问Vuex中的数据 -->
    从vuex中获取的值: <label>{{ $store.state.count }}</label>
    <br>
    <button @click="handleAdd(1)">值 + 1</button>
    <button @click="handleAdd(5)">值 + 5</button>
    <button @click="handleAdd(10)">值 + 10</button>
    <button @click="handleChange(666)">一秒后修改成666</button>
    <hr>
    {{ $store.getters.filterList }}
    <hr>
    <!-- 访问模块中的state -->
    <div>{{ $store.state.user.userInfo.name }}</div>
    <div>{{ $store.state.settings.theme }}</div>
    <hr>
    <!-- 访问模块中的getters -->
    <div>{{ $store.getters['user/UpperCaseName'] }}</div>
    <hr>
    <!-- 模块的mutation -->
    <button @click="changeUserName">修改name</button>
    <!-- 模块的action -->
    <button @click="changeUserNameLater">延迟修改name</button>
  </div>
</template>

<script>
export default {
  name: 'Son1Com',
  methods: {
    handleAdd (n) {
      // 不推荐直接修改Vuex中的数据
      // this.$store.state.count++

      // 推荐通过mutations中的函数来修改Vuex中的数据
      this.$store.commit('addCount', n)
    },
    handleChange (cnt) {
      // 调用actions
      this.$store.dispatch('changeCountAsync', cnt)
    },
    changeUserName () {
      this.$store.commit('user/setUser', {
        name: 'ls',
        age: 28
      })
    },
    changeUserNameLater () {
      this.$store.dispatch('user/setUserLater', {
        name: 'ww',
        age: 43
      })
    }
  }
}
</script>

<style lang="css" scoped>
.box{
  border: 3px solid #ccc;
  width: 400px;
  padding: 10px;
  margin: 20px;
}
h2 {
  margin-top: 10px;
}
</style>
