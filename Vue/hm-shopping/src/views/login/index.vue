<template>
  <div class="login">
    <van-nav-bar
      title="会员登录"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" alt="图形验证码" @click="getPicCode">
        </div>
        <div class="form-item">
          <input v-model="smsCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getSmsCode">{{ second === totalSecond? '获取验证码' : `${second}秒后重新获取` }}</button>
        </div>
      </div>

      <div @click="login" class="login-btn">登录</div>
    </div>
  </div>
</template>
<script>
import { getPicCode, getSmsCode, codeLogin } from '@/api/login'
export default {
  name: 'LoginIndex',
  data () {
    return {
      // 用户输入的图形验证码
      picCode: '',
      // 将来请求传递的图像验证码唯一标识
      picKey: '',
      // 图形验证码的URL
      picUrl: '',
      // 总倒计时
      totalSecond: 60,
      // 当前倒计时
      second: 60,
      // 定时器ID
      timer: null,
      // 手机号码
      mobile: '',
      // 短信验证码
      smsCode: ''
    }
  },
  created () {
    this.getPicCode()
  },
  destroyed () {
    // 销毁组件时，清除定时器
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  methods: {
    // 获取图形验证码
    async getPicCode () {
      const { data: { key, base64 } } = await getPicCode()
      this.picKey = key
      this.picUrl = base64
    },
    // 校验 手机号、图形验证码
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 获取短信验证码
    async getSmsCode () {
      if (!this.validFn()) return

      // 检查有无定时器，当前倒计时情况
      if (this.timer || this.second < this.totalSecond) return

      // 获取验证码
      // const res = await getSmsCode(this.picCode, this.picKey, this.mobile)
      // console.log(res)
      await getSmsCode(this.picCode, this.picKey, this.mobile)
      this.$toast('短信已发送，请注意查收')

      // 开启倒计时
      this.timer = setInterval(() => {
        // console.log('倒计时', this.second)
        this.second--
        if (this.second <= 0) {
          clearInterval(this.timer)
          this.timer = null // 重置定时器id
          this.second = this.totalSecond // 归位
        }
      }, 1000)
    },
    // 登录
    async login () {
      // 手机号，图形验证码
      if (!this.validFn()) return

      // 短信验证码
      if (!/^\d{6}$/.test(this.smsCode)) {
        this.$toast('请输入正确的手机验证码')
      }

      // 登录
      const res = await codeLogin(this.mobile, this.smsCode)
      console.log(res)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('登录成功')

      // 登录成功后，跳回之前的页面
      const backUrl = this.$route.query.backUrl || '/'
      this.$router.replace(backUrl)
    }
  }
}
</script>
<style lang="less">
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
