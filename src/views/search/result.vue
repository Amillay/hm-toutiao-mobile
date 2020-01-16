<template>
  <div class="container">
     <van-nav-bar left-arrow title="搜索结果" @click-left="$router.back()"></van-nav-bar>

      <!-- <van-nav-bar fixed title="搜索结果" left-arrow @click-left="$router.back()" /> -->

      <van-list w-model="upLoading" :finished="finished" @load="onLoad">
        <van-cell-group>
          <van-cell v-for="item in articles" :key="item.art_id.toString()" :to="`/articles?articleId=${item.art_id.toString()}`">
            <!-- art_id有可能是大数字 会转成bignumber 要转一下 -->
            <div class="article_item">
              <h3 class="van-ellipsis">{{item.title}}</h3>
              <div class="img_box" v-if="item.cover.type === 3">
                <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[0]" />
                <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[1]" />
                <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[2]" />
              </div>
              <div class="img_box"  v-if="item.cover.type === 1">
                <van-image class="w100" fit="cover" :src="item.cover.images[0]" />
              </div>
              <div class="info_box">
                <span>{{item.aut_name}}</span>
                <span>{{item.comm_count}}评论</span>
                <span>{{item.pubdate | relTime}}</span>
              </div>
            </div>
          </van-cell>
        </van-cell-group>
      </van-list>
  </div>
</template>

<script>
import { searchArticle } from '@/api/article'
export default {
  name: 'searchResult',
  data () {
    return {
      upLoading: false, // 是否开启上拉加载状态
      finished: false, // 是否已经完成了全部的加载
      articles: [], // 存放文章的列表
      page: { // 放置分页信息的
        page: 1, // 当前页码
        per_page: 10 // 每页请求十条数据
      }
    }
  },
  methods: {
    async onLoad () {
      console.log('开始加载')
      let { q } = this.$route.query // 从地址栏解析查询参数
      let data = await searchArticle({ ...this.page, q })
      // 上拉加载是要追加到队尾
      this.articles.push(...data.results)
      // 手动关闭加载状态
      this.upLoading = false
      // 根据当前返回的数组的长度 当前长度为0肯定没有下一页了
      if (data.results.length) {
        this.page.page++ // 不为0加1
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding-top: 46px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      height: 180px;
      width: 100%;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    span {
      padding-right: 10px;
    }
  }
}
</style>
