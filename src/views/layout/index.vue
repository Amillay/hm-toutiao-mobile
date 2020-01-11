<template>
  <div class="container">
    <!-- 采用vant导航组件来实现 -->
    <van-nav-bar v-if="showNavBar" title="黑马头条" right-text="搜索" fixed="true" @click-right="$router.push('/search')"></van-nav-bar>
    <!-- 二级路由 -->
    <!-- :class="{名称：布尔值}" -->
    <div class="my-wrapper" :class="{noTop:!showNavBar }"><router-view> </router-view></div>
    <!-- 标签栏 开启路由route  :route="true"-->
  <van-tabbar route>
    <!-- router-link  to属性 -->
  <van-tabbar-item route="/" icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item route="/question" icon="chat-o">问答</van-tabbar-item>
  <van-tabbar-item route="/video" icon="video-o">视频</van-tabbar-item>
  <van-tabbar-item route="/user" icon="user-o">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout',
  computed: {
    showNavBar () {
      return this.$route.path !== '/user'
    }
  }
}
</script>

<style lang="less" scoped>
//less-loader > css-loader > style-loader
.container{
  width: 100%;
  height: 100%;
  position: relative;
  .my-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop{
      padding-top: 0;
    }
  }
}
</style>
