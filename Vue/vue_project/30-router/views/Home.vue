<template>
  <div class="home">
    <p>欢迎来到我的音乐主页</p>
    <p>这里有你喜欢的音乐推荐</p>
    <p>快来探索吧！</p>
    <hr>
    <input type="text" v-model="inp" placeholder="请输入搜索内容">
    <button @click="goSearch">搜索（查询参数）</button>
    <button @click="goSearch2">搜索（动态路由）</button>
    <p>
        <span>热门搜索（查询参数）：</span> 
        <router-link to="/search?key=流行">流行</router-link>
        <router-link to="/search?key=摇滚">摇滚</router-link>
        <router-link to="/search?key=民谣">民谣</router-link>
    </p>
    <p>
        <span>热门搜索（动态路由）：</span> 
        <router-link to="/search/流行">流行</router-link>
        <router-link to="/search/摇滚">摇滚</router-link>
        <router-link to="/search/民谣">民谣</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'MyHome',
  data() {
    return {
      inp: ''
    }
  },
  methods: {
    goSearch() {
      // this.$router.push(`/search?key=${this.inp}`)

      // this.$router.push({
      //   path: '/search',
      //   query: {
      //     key: this.inp
      //   }
      // })

      this.$router.push({
        name: 'search',
        query: {
          key: this.inp
        }
      })
    },
    goSearch2() {
      // this.$router.push(`/search/${this.inp`)

      // this.$router.push({
      //   path: `/search/${this.inp}`
      // })

      this.$router.push({
        name: 'search',
        params: {
          word: this.inp
        }
      })
    }
  }
}
</script>

<style scoped>
    .home {
        padding: 20px;
    }
    .home p {
        font-size: 18px;
        margin-bottom: 10px;
    }
    .home input {
        padding: 5px;
        font-size: 16px;
    }
    .home button {
        padding: 5px 10px;
        font-size: 16px;
        margin-left: 10px;
    }
    .home a {
        margin-right: 10px;
        color: #42b983;
        text-decoration: none;
    }
</style>