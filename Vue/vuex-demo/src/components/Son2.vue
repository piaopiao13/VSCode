<template>
  <div class="box">
    <h2>Son2 子组件</h2>
    <!-- 模板中访问Vuex中的数据 -->
    <!-- 从vuex中获取的值: <label>{{ $store.state.count }}</label> -->
    从vuex中获取的值:<label>{{ count }}</label>
    <br />
    <!-- <button @click="handleSub(1)">值 - 1</button>
    <button @click="handleSub(5)">值 - 5</button>
    <button @click="handleSub(10)">值 - 10</button> -->
    <button @click="subCount(1)">值 - 1</button>
    <button @click="subCount(5)">值 - 5</button>
    <button @click="subCount(10)">值 - 10</button>
    <button @click="changeCountAsync(888)">一秒后修改成888</button>
    <hr>
    {{ filterList }}
    <hr>
    <!-- 访问模块中的state -->
    <div>{{ user.userInfo.name }}</div>
    <div>{{ settings.theme }}</div>
    <div>{{ userInfo }}</div>
    <hr>
    <!-- 访问模块中的getters -->
    {{ UpperCaseName }}
    <!-- 模块的mutation -->
    <button @click="setUser({name: 'pink', age: 66})">修改name</button>
    <!-- 模块的action -->
    <button @click="setUserLater({name: 'red', age: 57})">延迟修改name</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'Son2Com',
  computed: {
    // // 计算属性，获取Vuex中的count值
    // count() {
    //   return this.$store.state.count
    // }

    // 使用mapState辅助函数简化代码
    ...mapState(['count', 'user', 'settings']),
    ...mapState('user', ['userInfo']), // 需要开启命名空间

    ...mapGetters(['filterList']),
    ...mapGetters('user', ['UpperCaseName'])
  },
  methods: {
    // handleSub (n) {
    //   this.$store.commit('subCount', n)
    // },
    ...mapMutations(['subCount']),
    // 使用mapActions辅助函数简化代码
    ...mapActions(['changeCountAsync']),

    // 分模块
    ...mapMutations('user', ['setUser']),
    ...mapActions('user', ['setUserLater'])
  }
}
</script>

<style lang="css" scoped>
.box {
  border: 3px solid #ccc;
  width: 400px;
  padding: 10px;
  margin: 20px;
}
h2 {
  margin-top: 10px;
}
</style>
