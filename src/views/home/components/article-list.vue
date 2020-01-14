<template>
  <div class="scroll-wrapper">
      <!-- 放置list组件实现上拉加载 -->
      <van-list v-model="upLoading" :finished="finished" finished-text="没有更多了" @load="onLoad"></van-list>

    </div>
</template>

<script>
export default {
  data () {
    return {
      upLoading: false, // 是否开启上拉加载
      finished: false // 是否完成了全部数据的加载
    }
  },
  methods: {
    //   上拉加载方法
    onLoad () {
      console.log('开始加载数据')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
