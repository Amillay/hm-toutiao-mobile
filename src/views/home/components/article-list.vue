<template>
  <div class="scroll-wrapper">
      <!-- 放置list组件实现上拉加载   组件距离底部超过一定距离 就自己调用获取数据-->
      <van-list v-model="upLoading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="article in articles" :key="article" :title="article"></van-cell>
      </van-list>

    </div>
</template>

<script>
export default {
  data () {
    return {
      upLoading: false, // 是否开启上拉加载
      finished: false, // 是否完成了全部数据的加载
      articles: [] // 接受上拉加载数据
      // Array(100)
      // Array.from(Array(100))
      // Array.from(Array(10),(value,index) => {index})
    }
  },
  methods: {
    //   上拉加载方法
    onLoad () {
    //   console.log('开始加载数据')
      setTimeout(() => {
        // 设置一个上限不能超过五十条
        if (this.articles.length < 50) {
          let arr = Array.from(Array(10), (value, index) => this.articles.length + index + 1)
          this.articles.push(...arr)
          // 关掉状态
          this.upLoading = false
        } else {
          this.finished = true // 告诉list组件，我已经加载完毕了 不用再继续加载了
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
