<template>
  <div>
      <!-- @closed="editing=false" 关闭屉式菜单  重置编辑状态为不编辑 -->
<van-action-sheet :value="value" @closed="editing=false"
                  @input="$emit('input', $event)" title="编辑频道">
    <div class="channel">
      <div class="tit">
        我的频道：
        <span class="tip">点击可进入频道</span>
        <van-button v-if="!editing" @click="editing=true"
                    size="mini" type="info" plain>编辑</van-button>
        <van-button v-else @click="editing=false"
                    size="mini" type="danger"  plain>完成</van-button>
      </div>
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="(channel,i) in channels" :key="channel.id">
            <!-- 告诉父组件点击了哪个 -->
          <span class="f12" :class="{red: activeIndex === i}" @click="$emit('selectChannel',channel.id)" >{{channel.name}}</span>
              <!-- 通过编辑状态来控制叉号图标的显示和隐藏  频繁切换使用v-show-->
          <!-- <v-if优先级大于v-show -->
        <template v-if="i!==0">
            <van-icon v-show="editing" class="btn" name="cross" @click="$emit('delChannel',channel.id)">
                <!-- 告诉父组件删除哪个频道传出id -->
            </van-icon>
        </template>
          <!--第二种方法 <van-icon v-if="i!== 0" v-show="editing" class="btn" name="plus"></van-icon> -->
        </van-grid-item>
      </van-grid>
    </div>

<!-- 可选频道 -->
    <div class="channel">
      <div class="tit">可选频道：</div>
      <van-grid class="van-hairline--left">
            <van-grid-item v-for="channel in optionalChannels" :key="channel.id">
          <span class="f12">{{channel.name}}</span>
          <van-icon class="btn" name="plus" @click="$emit('addChannel',channel)"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
  </van-action-sheet>
  </div>

 <!-- 可选频道=全部频道-我的频道 两个数组相减 -->
 <!-- var a= [1,2,3,4,5] var b = [1,2,3] a.filter(item => !b.some(o =>o===item))    filter返回一个数组 -->
</template>

<script>
import { getAllChannels } from '@/api/channels'
export default {
  data () {
    return {
      editing: false, // 是否正在编辑
      allChannels: [] // 接收所有频道
    }
  },
  props: {
    //   接受数据
    channels: {
      type: Array,
      default: () => []
      // 要求我们必须要用一个函数来声明数组类型  所以永健有函数
    },
    activeIndex: {
      type: Number
    }
  },
  methods: {
    async getAllChannels () {
      const data = await getAllChannels
      this.allChannels = data.channels
    }
  },
  computed: {

    optionalChannels () {
      return this.allChannels.filter(item => !this.channels.some(o => o.id === item.id))
    }
  },
  created () {
    this.getAllChannels()
  }
}
</script>

<style lang="less" scoped>
.van-popup--bottom{
  &.van-popup--round{
    border-radius: 0;
  }
}
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
.channel {
  padding: 10px;
  .tit{
    line-height: 3;
    .tip {
      font-size: 10px;
      color: #999;
    }
  }
  .van-button {
    float: right;
    margin-top: 7px;
  }
  .btn{
    position: absolute;
    bottom: 0;
    right: 0;
    background: #ddd;
    font-size: 12px;
    color: #fff;
  }
  .f12{
      font-size:12px;
      color: #555;
  }
  .red{
    color: red;
  }
}
</style>
