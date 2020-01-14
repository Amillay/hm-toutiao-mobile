<template>
  <div class="scroll-wrapper">
      <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="refreshSuccessText">
          <!-- 放置list组件实现上拉加载   组件距离底部超过一定距离 就自己调用获取数据-->
      <van-list v-model="upLoading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="article in articles" :key="article.art_id.toString()" >
              <div class="article_item">
  <h3 class="van-ellipsis">{{article.title}}</h3>
  <!-- 三图模式 -->
  <div class="img_box" v-if="article.cover.type === 3">
     <van-image class="w33" fit="cover" :src="article.cover.images[0]"/>
     <van-image class="w33" fit="cover" :src="article.cover.images[1]"/>
     <van-image class="w33" fit="cover" :src="article.cover.images[2]"/>
  </div>
  <!-- 单图模式 -->
  <div class="img_box" v-if="article.cover.type === 1">
      <van-image class="w100" fit="cover" :src="article.cover.images[0]"/>
  </div>
  <div class="info_box">
     <span>{{article.aut_name}}</span>
     <span>{{article.comm_count}}评论</span>
     <span>{{article.pubdate}}</span>
     <span class="close"><van-icon name="cross"></van-icon></span>
  </div>
</div>
          </van-cell>
      </van-list>
      </van-pull-refresh>

    </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
export default {
  data () {
    return {
      downLoading: false, // 是否开启下拉刷新状态
      upLoading: false, // 是否开启上拉加载
      finished: false, // 是否完成了全部数据的加载
      articles: [],
      refreshSuccessText: '', // 接受上拉加载数据
      timestamp: null // 定义一个时间戳   用来告诉服务器我现在要什么时间的数据
    }
  },
  props: {
    channel_id: {
      //   指定传的props类型
      type: Number,
      //   要求props必须传
      required: true,
      default: null // 给props一个默认值
    }
  },
  methods: {
    // Array(100)
    // Array.from(Array(100))
    // Array.from(Array(10),(value,index) => index)
    //   上拉加载方法
    async onLoad () {
      console.log('开始加载数据')
      //   setTimeout(() => {
      //     // 设置一个上限不能超过五十条
      //     if (this.articles.length < 50) {
      //       let arr = Array.from(Array(10), (value, index) => this.articles.length + index + 1)
      //       this.articles.push(...arr)
      //       // 关掉状态
      //       this.upLoading = false
      //     } else {
      //       this.finished = true // 告诉list组件，我已经加载完毕了 不用再继续加载了
      //     }
      //   }, 1000)
      const data = await getArticles({ channel_id: this.channel_id, timestamp: this.timestamp || Date.now() })
      this.articles.push(...data.results)
      //   debugger
      // 关闭加载状态
      this.upLoading = false
      //   判断历史时间戳 有历史继续向下 没有历史就把finished为true
      if (data.pre_timestamp) {
        this.timestamp = data.pre_timestamp
      } else {
        // 认为没有历史了没有必要继续加载了
        this.finished = true
      }
    },
    onRefresh () {
      console.log('下拉刷新')
      setTimeout(() => {
        let arr = Array.from(Array(10), (value, index) => '追加' + (index + 1))
        this.articles.unshift(...arr)
        this.downLoading = false
        this.refreshSuccessText = `更新了${arr.length}数据`
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.article_item{
  h3{
    font-weight: normal;
    line-height: 2;
  }
  .img_box{
    display: flex;
    justify-content: space-between;
    .w33{
      width: 33%;
      height: 90px;
    }
    .w100{
      width: 100%;
      height: 180px;
    }
  }
  .info_box{
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span{
      padding-right: 10px;
      &.close{
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
