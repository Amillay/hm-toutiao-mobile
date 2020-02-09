<template>
  <div class="container">
    <!-- 采用vant导航组件来实现 -->
    <van-nav-bar v-if="showNavBar" title="黑马头条" right-text="搜索" fixed @click-right="$router.push('/search')"></van-nav-bar>
    <!-- 二级路由 -->
    <!-- :class="{名称：布尔值}" -->
    <div class="my-wrapper" :class="{noTop:!showNavBar }">
      <keep-alive>
        <!-- 二级路由容器   keep-alive进行缓存  二级路由都会保留缓存 -->
        <router-view> </router-view>
        </keep-alive>

      </div>
    <!-- 标签栏 开启路由route  :route="true"-->
  <van-tabbar route>
    <!-- router-link  to属性 -->
  <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item to="/question" icon="chat-o">问答</van-tabbar-item>
  <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
  <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
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
