<template>
  <div class="container">
<van-tabs swipeable v-model="activeIndex" @change="changeTab">
  <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
    <!-- 这个div设置了滚动条  后面做阅读记忆   阅读记忆：看文章看到一半  滑到中部去了别的页面，回来时文章还在之前停留的位置 -->
    <!-- <div class="scroll-wrapper">
      <van-cell-group>
        <van-cell v-for="obj in 20" :key="obj" :title="item"></van-cell>
      </van-cell-group>
    </div> -->
    <!-- 一个tab标签对应一个arctile-list组件 -->
    <!-- 监听子组件事件  应该在子组件的标签上写监听 -->
    <article-list @showAction="openMoreAction" :channel_id="channel.id"></article-list>
    <!-- <article-list :channel_id="channel.id"></article-list> -->

  </van-tab>
</van-tabs>
<span class="bar_btn" @click="showChannelEdit=true"><van-icon  name="wap-nav"/></span>
<!-- 放置弹层 -->
<van-popup v-model="showMoreAction" :style="{width:'80%'}">
  <more-action @dislike="dislikeOrReport($event,'dislike')" @report="dislikeOrReport($event,'report')"></more-action>
</van-popup>
<!-- 频道编辑 -->
<van-action-sheet title="编辑频道" v-model="showChannelEdit" :round="false" >

  <!-- 给谁传在谁的标签上写属性 父组件监听选择频道事件 -->
  <channel-edit :channels="channels" @selectChannel="selectChannel" :activeIndex="activeIndex" @delChannel="delChannel" @addChannel="addChannel"></channel-edit>
</van-action-sheet>

  </div>
</template>

<script>
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit'
import MoreAction from './components/more-action'

import eventBus from '@/utils/eventBus.js'

import { disLikeArticle, reportArticle } from '@/api/article.js'
import { getMyChannels, delChannel, addChannel } from '@/api/channels'

export default {
  name: 'home',
  data () {
    return {
      activeIndex: 0, // 默认启用第0个标签
      channels: [], // 接收频道的数据
      showMoreAction: false, // 控制显示反馈弹层
      articleId: null,
      showChannelEdit: false
    }
  },
  components: {
    ArticleList,
    MoreAction,
    ChannelEdit
  },
  methods: {
    changeTab () {
      // 要通知所有的article-list实例告诉他们切换页签，并且把切换的页签传过去
      // 看看是不是自己所在的页签，是自己的判断是否有滚动，如果有滚定那么滚动至对应的位置
      eventBus.$emit('changeTab', this.channels[this.activeIndex].id) // 切换tab页触发一个公共事件
    },
    // 删除频道方法
    async delChannel (id) {
      try {
        await delChannel(id) // 表示删除数据成功
        // debugger
        //  要移除自身data中channels数据
        let index = this.channels.findIndex(item => item.id === id)
        if (index <= this.activeIndex) {
          // 判断一下激活的索引和现在要删除的索引之间的关系   在后面索引还是原来的  前面的或者本身删除才会改变
          this.activeIndex = this.activeIndex - 1
        }
        if (index > -1) {
          this.channels.splice(index, 1) // 移除当前频道
        }
      } catch (error) {
        this.$notice({ type: 'danger', message: '删除错误' })
      }
    },
    async getMyChannels () {
      // 获取频道列表
      let data = await getMyChannels()
      this.channels = data.channels
    },
    openMoreAction (artId) {
      this.showMoreAction = true
      this.articleId = artId
    },
    // 切换到对应频道关闭弹层
    selectChannel (id) {
      // findIndex(item => item === 1)
      let index = this.channels.findIndex(item => item.id === id) // 获取切换频道的索引
      this.activeIndex = index // 切换对应索引下tab
      //  关闭弹层
      this.showChannelEdit = false
    },
    // 添加频道
    async addChannel (channel) {
      await addChannel(channel) // 完成写入本地缓存
      this.channels.push(channel) // 修改data中的数据
    },
    //   // 调用不喜欢的文章接口
    //   async dislike () {
    //     try {
    //       await disLikeArticle({ target: this.articleId })
    //       this.$notice({
    //         type: 'success',
    //         message: '操作成功'
    //       })
    //       // 文章id频道id
    //       eventBus.$emit('delArticle', this.articleId, this.channels[this.activeIndex].id)
    //       this.showMoreAction = false
    //     } catch (error) {
    //       this.$notice({
    //         type: 'danger',
    //         message: '操作失败'
    //       })
    //     }
    //   },
    //   // 调用举报文章接口
    //  async report (type) {
    //    await reportArticle({target: this.articleId, type})

    //      this.$notice({
    //         type: 'success',
    //         message: '操作成功'
    //       })
    //       // 同样要删除文章
    //       eventBus.$emit('delArticle', this.articleId, this.channels[this.activeIndex].id)
    //       this.showMoreAction = false
    //     } catch (error) {
    //       this.$notice({
    //         type: 'danger',
    //         message: '操作失败'
    //       })
    //     }
    //  },
    /** 下面两个相同封装抽提 */
    async dislikeOrReport (params, operateType) {
      // debugger
      try {
        operateType === 'dislike' ? await disLikeArticle({ target: this.articleId }) : await reportArticle({ target: this.articleId, type: params })

        this.$notice({
          type: 'success',
          message: '操作成功'
        })
        // 删除文章
        eventBus.$emit('delArticle', this.articleId, this.channels[this.activeIndex].id)
        this.showMoreAction = false
      } catch (error) {
        this.$notice({
          type: 'danger',
          message: '操作失败'
        })
      }
    }
  },
  created () {
    this.getMyChannels()
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
// 弹窗的样式
.van-action-sheet {
  max-height: 100%;
  height: 100%;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
}
</style>
