<template>
  <div class="container">
    <nav-nav-bar title="登录" left-arrow @click-left="$router.back()"></nav-nav-bar>
    <!-- 手机号和验证码登录按钮 -->
    <van-cell-group>
      <!-- required前面红点 -->
      <van-field placeholder="请输入手机号" label="手机号" v-model="loginForm.mobile" :error-message="errMsg.mobile" @blur="chackMobile"></van-field>
      <van-field placeholder="请输入验证码" label="密码" v-model="loginForm.code" :error-message="errMsg.code" @blur="checkCode">
        <!-- slot指定哪个填内容 -->
        <van-button type="primary" slot="button" size="small">发送验证码</van-button>
      </van-field>
      </van-cell-group>
      <!-- 大号按钮  size="large" -->
      <div class="btn-box"><van-button type="info" block round size="small" @click="login">登录</van-button></div>

  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      errMsg: {
        // 错误的
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    checkMobile () {
      // 判断
      if (!this.loginForm.mobile) {
        this.errMsg.mobile = '手机号不能为空'
        return false
      }
      // 判断格式 正则表达式
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        this.errMsg.mobile = '格式不正确'
        return false
      }
      this.errMsg.mobile = '' // 清空
      return true
    },
    checkCode () {
      if (!this.loginForm.code) {
        this.errMsg.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errMsg.code = '验证码格式错误'
        return false
      }
      this.errMsg.code = ''
      return true
    },
    // 登录方法
    login () {
      if (this.checkMobile() && this.checkCode()) {
        // 满足规则发请求校验
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  padding: 20px
}
</style>
