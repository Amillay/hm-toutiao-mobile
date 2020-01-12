<template>
  <div class="container">
    <nav-nav-bar title="登录" left-arrow @click-left="$router.back()"></nav-nav-bar>
    <!-- 手机号和验证码登录按钮 -->
    <van-cell-group>
      <!-- required前面红点 -->
      <van-field placeholder="请输入手机号" label="手机号"></van-field>
      <van-field placeholder="请输入验证码" label="密码">
        <!-- slot指定哪个填内容 -->
        <van-button type="primary" slot="button" size="small">发送验证码</van-button>
      </van-field>
      </van-cell-group>
      <!-- 大号按钮  size="large" -->
      <div class="btn-box"><van-button type="info" block round size="small">登录</van-button></div>

  </div>
</template>

<script>
export default {
  name: 'login'
}
</script>

<style lang="less" scoped>
.btn-box {
  padding: 20px
}
</style>
