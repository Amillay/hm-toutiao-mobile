<template>
  <div class="container">

    <!-- 搜索组件一级路由   返回上一个页面 -->
    <van-nav-bar left-arrow title="搜索中心" @click-left="$router.back()"></van-nav-bar>

    <!-- 搜索框  v-model.trim去空格的修饰符 -->
     <van-search v-model.trim="q" placeholder="请输入搜索关键词" shape="round" @search="onSearch"/>

     <!-- 联想搜索 -->
     <van-cell-group class="suggest-box" v-if="q">
      <van-cell icon="search">
        <p>
          <span>j</span>ava
        </p>
      </van-cell>
    </van-cell-group>

    <!-- 历史记录 只有有历史记录时才显示整个历史记录的盒子 -->
      <div class="history-box" v-if="historyList.length">
      <div class="head">
        <span>历史记录</span>
        <!-- 清空所有历史 -->
        <van-icon name="delete" @click="clear"></van-icon>
      </div>
      <van-cell-group>
        <!-- 循环生成历史记录  搜索的历史记录不能重复 item就是搜索的关键字-->
        <van-cell v-for="(item,index) in historyList" :key="item" @click="toResult(item)">
          <a class="word_btn">{{ item }}</a>
          <!-- 删除按钮 事件修饰符  事件名.stop 阻止了事件冒泡-->
          <van-icon @click="delHistory(index)" class="close_btn" slot="right-icon" name="cross" @click.stop="delHistory(index)"/>
        </van-cell>
      </van-cell-group>
    </div>

  </div>
</template>

<script>
const key = 'hm-91-history' // 历史记录key
export default {
  name: 'search',
  data () {
    return {
      q: '', // 查询内容
      historyList: [] // 存放历史记录
    }
  },
  created () {
    this.historyList = JSON.parse(localStorage.getItem(key) || '[]')
  },
  methods: {
    delHistory (index) {
      this.historyList.splice(index, 1) // 删除对应历史记录
      localStorage.setItem(key, JSON.stringify(this.historyList)) // 重新写入缓存
    },
    // 调到搜索结果页面
    toResult (text) {
      this.$router.push({ path: '/search/result', query: { q: text } }) // 直接跳转到搜索结果页面
    },
    clear () {
      this.historyList = [] // 清空所有
      localStorage.setItem(key, '[]') // 写入缓存
    },
    onSearch () {
      console.log('开始搜索')
      // 去搜索结果页面也要携带q参数
      // 跳转搜索结果之前 当前关键字写入历史记录
      // console.log(this.q)
      if (!this.q) return // 如果q为空  直接返回
      // 如果不为空 加入历史记录中   要先去重   new Set（） set自动去重 去重方法 转数组Array.from()
      let obj = new Set(this.historyList)
      obj.add(this.q)
      this.historyList = Array.from(obj) // 转回数组
      localStorage.setItem(key, JSON.stringify(this.historyList))
      this.$router.push({ path: '/search/result', query: { q: this.q } })
    }
  }
}
</script>

<style lang="less" scoped>
.history-box {
  padding: 0 20px;
  .head{
    line-height: 36px;
    color: #999;
    .van-icon{
      font-size: 16px;
      float: right;
      margin-top: 10px;;
    }
  }
  .van-cell{
    padding: 10px 0;
  }
  .word_btn{
    color:#3296fa;
  }
  .close_btn{
    margin-top:5px;
    color: #999;
  }
}
.suggest-box{
  /deep/ .van-cell{
    padding: 10px 20px;
    color: #999;
    p{
      span{
        color: red;
      }
    }
  }
}
</style>
