<template>
  <div class="comment">
    <!-- van-list完成上拉加载 -->
      <van-list @load="onload" :finished="finished" finished-text="没有更多了">
  <div class="item van-hairline--bottom van-hairline--top" v-for="comment in comments"               :key="comment.com_id.toString()">
    <van-image round width="1rem" height="1rem" fit="fill" :src="comment.aut_photo" />
    <div class="info">
      <p>
        <span class="name">{{comment.aut_name}}</span>
        <span style="float:right">
          <span class="van-icon van-icon-good-job-o zan"></span>
          <span class="count">{{comment.like_count}}</span>
        </span>
      </p>
      <p>{{comment.content}}</p>
      <p>
        <span class="time">{{comment.pubdate | relTime}}</span>&nbsp;
        <van-tag plain @click=openReply(comment.com_id)>{{comment.reply_count}}回复</van-tag>
      </p>
    </div>
  </div>
</van-list>
<!-- 提交模块 -->
<div class="reply-container van-hairline--top">
  <!-- v-model去掉前后内容的空格 -->
  <van-field v-model.trim="value" placeholder="写评论...">
    <!-- van-loading通过submiting状态来控制显示 -->
    <van-loading v-if="submiting" slot="button" type="spinner" size="16px">
    </van-loading>
    <span class="submit" @click="submit" slot="button">提交</span>
  </van-field>
</div>
<!-- 回复列表组件 -->
  <van-action-sheet :round="false" v-model="showReply" title="回复评论" class="reply_dailog">
  <!-- 回复列表组件  加载状态-->
  <van-list v-model="reply.loading" :finished="reply.finished" finished-text="没有更多了" :immediate-check="false">
    <!-- immediate-check是否主动检查滚动  关闭 -->
    <!-- 这里才是要循环的数据 -->

        <div class="item van-hairline--bottom van-hairline--top" v-for="reply in reply.list" :key="reply.comment">
          <van-image round width="1rem" height="1rem" fit="fill" src="reply." />
          <div class="info">
            <p><span class="name">一阵清风</span></p>
            <p>评论的内容，。。。。</p>
            <p><span class="time">两天内</span></p>
          </div>
        </div>
  </van-list>
  </van-action-sheet>
  </div>

</template>

<script>
import { getComments, commentOrReply } from '@/api/article' // 引入封装的获取评论方法 添加两个属性存放评论数据 一个是offset
export default {
  data () {
    return {
      // 评论列表加载中状态
      loading: false,
      // 评论列表完全加载完毕状态
      finished: false,
      // 输入的内容
      value: '',
      // 提交 评论或者回复 中
      submiting: false,
      comments: [],
      offset: null, // 表示分页依据
      showReply: false,
      reply: {
        // 存放回复相关的数据
        loading: false, // 回复列表组件状态
        finished: false, // 回复列表组件结束状态
        offset: null, // 偏移量
        list: [], // 用于存放当前弹出关于某个评论的回复列表
        commentId: null
      }
    }
  },
  methods: {
    // 提交评论
    async submit () {
      if (!this.value) return false
      this.submiting = true // 提交状态设置成true  控制用户单位时间评论据次数
      await this.$sleep() // 强制等待500毫秒   在封装的方法里面 plugin
      try { // 评论  两种分别是文章评论一种是评论进行评论
        // 当前评论内容为空就继续返回
        // 不为空继续   怎么区分两种评论
        const data = await commentOrReply({
          target: this.reply.commentId ? this.reply.commentId.toString() : this.$route.query.articleId, // 表示要么是文章id要么是评论id
          content: this.value, // 评论内容
          art_id: this.reply.commentId ? this.$route.query.articleId : null // 评论进行评论   文章id必须上传

        })
        // 评论成功怎么处理 将评论数据添加
        // 需要知道加到哪个数组最前面
        if (this.reply.commentId) {
          //  对评论进行评论
          this.reply.list.unshift(data.new_obj) // 数据加到头如果对评论进行评论找到该评论并且对该评论次数加上
          this.commentId.find(item => item.com_id.toString() === this.reply.commentId.toString()) // 怎么找到对应评论
          // comment && comment.reply_count++
        } else {
          //  对文章进行评论
          this.comments.unshift(data.new_obj)
        }
        this.value = '' // 清空输入框
      } catch (error) {
        this.$notice({ type: 'danger', message: '评论失败' })
      }
    },
    async onload () {
      console.log('获取评论')
      // 需要加载评论数据
      let data = await getComments({
        type: 'a',
        offset: this.offset, // 偏移量
        source: this.$route.query.articleId
      })
      this.comments.push(...data.results) // 数据添加到评论列表尾部data.results
      this.loading = false // 关闭上拉加载状态
      this.finished = data.last_id === data.end_id // 当前页id等于整个评论最后一个id表示请求完了所有评论数据
      if (!this.finished) {
        // 表示不相等  还有下一页数据
        this.offset = data.last_id // 下一页的请求依据
      }
    },
    openReply (commentId) {
      this.showReply = true // 弹出面板
      this.reply.commentId = commentId // 点击id
      this.reply.list = [] // 清空原有数据
      this.results.offset = null // 重置回复偏移量  从第一页开始
      this.reply.finished = false
      this.reply.loading = true // 打开加载状态不会自己调用
      // 不会自己调用，上面设置成了false不会自己调用
      this.getReply() // 调用数据
    },
    async getReply () {
      let data = await getComments({
        type: 'c', // 获取评论的评论
        offset: this.reply.offset,
        source: this.reply.commentId.toString()// 代表获取的评论（id）的评论
      })
      console.log(data)
      //  data只是请求第一页数据
      this.reply.loading = false // 将评论的评论加载状态关闭
      this.reply.finished = data.end_id = data.last_id
      if (!this.reply.finished) {
        // 有下一页
        this.reply.offset = data.last_id
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  margin-top: 10px;
  /deep/ .item {
    display: flex;
    padding: 10px 0;
    .info {
      flex: 1;
      padding-left: 10px;
      .name{
        color:#069;
      }
      .zan{
        vertical-align:middle;
        padding-right:2px;
      }
      .count{
        vertical-align:middle;
        font-size:10px;
        color: #666;
      }
      .time{
        color: #666;
      }
      p {
        padding: 5px 0;
        margin: 0;
      }
    }
  }
  /deep/ .van-button:active::before {
    background: transparent;
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
  .submit {
    font-size: 12px;
    color: #3296fa;
  }
}
.reply_dailog {
  height: 100%;
  max-height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
  // .van-action-sheet__content{
  //   flex: 1;
  //   overflow-y: auto;
  //   padding: 0 10px 44px;
  // }
}
</style>
