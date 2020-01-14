<template>
  <div class="container">
<van-tabs swipeable v-model="activeIndex">
  <van-tab :title="'标签'+ item" v-for="item in 10" :key="item">
    <!-- 这个div设置了滚动条  后面做阅读记忆   阅读记忆：看文章看到一半  滑到中部去了别的页面，回来时文章还在之前停留的位置 -->
    <!-- <div class="scroll-wrapper">
      <van-cell-group>
        <van-cell v-for="obj in 20" :key="obj" :title="item"></van-cell>
      </van-cell-group>
    </div> -->
    <!-- 一个tab标签对应一个arctile-list组件 -->
    <article-list></article-list>
  </van-tab>
</van-tabs>
<span class="bar_btn"><van-icon  name="wap-nav" /></span>
  </div>
</template>

<script>
import ArticleList from './components/article-list'
export default {
  name: 'home',
  data () {
    return {
      activeIndex: 0// 默认启用第0个标签
    }
  },
  components: {
    ArticleList
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content{
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane{
    height: 100%;
    .scroll-wrapper{
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
</style>
