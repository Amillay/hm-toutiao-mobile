<template>
  <div class="more-action">
    <!-- <van-popup v-model="show" @open="isReport=false"> -->
    <van-cell-group v-if="!isReport">
        <!-- 点击按钮触发父组件调用不感兴趣的接口 -->
      <van-cell @click="$emit('dislike')">不感兴趣</van-cell>
      <van-cell is-link @click="isReport=true">反馈垃圾内容</van-cell>
      <van-cell>拉黑作者</van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReport=false">返回</van-cell>
      <!-- 点击举报按钮 触发父组件  去调用举报文章接口 -->
      <van-cell v-for="item in reports" :key="item.value" @click="$emit('report',item.value)">{{item.label}}</van-cell>
    </van-cell-group>
  <!-- </van-popup> -->
  </div>
</template>

<script>
import { reports } from '@/api/constants'
import eventBus from '@/utils/eventBus'
export default {
  name: 'more-action',
  data () {
    return {
      // show: false,
      isReport: false,
      reports: reports
    }
  },
  created () {
    eventBus.$on('delArticle', () => {
      this.isReport = false // 重置状态
    })
  }
}
</script>

<style lang="less" scoped>
// .van-popup
.more-action
{
//   width: 80%;
  border-radius: 4px;
}
</style>
