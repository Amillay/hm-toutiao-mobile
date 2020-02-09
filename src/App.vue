<template>
  <div id="app">
    <keep-alive>
      <!-- 一级路由容器 所有一级路由组件都进行了缓存 所有组件都缓存了   这样内存缓存过大会造成泄露的风险-->
      <!-- $route.meta.isAlive 如果为true使用keep-alive包裹  如果为falserouter-view放在外面 -->
      <!-- 为true包裹在里面  保证只有layout进行缓存-->
    <router-view v-if="$route.meta.isAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.isAlive"></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
</style>
