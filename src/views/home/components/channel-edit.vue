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
        <van-grid-item v-for="index in 8" :key="index">
          <span class="f12">频道{{index}}</span>
          <van-icon v-show="editing" class="btn" name="cross"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="channel">
      <div class="tit">可选频道：</div>
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="(channel,i) in channels" :key="channel.id">
          <span class="f12">{{channel.name}}</span>
          <!-- 通过编辑状态来控制叉号图标的显示和隐藏  频繁切换使用v-show-->
          <!-- <v-if优先级大于v-show -->
        <template v-if="i!==0">
            <van-icon v-show="editing" class="btn" name="plus"></van-icon>
        </template>
          <!--第二种方法 <van-icon v-if="i!== 0" v-show="editing" class="btn" name="plus"></van-icon> -->
        </van-grid-item>
      </van-grid>
    </div>
  </van-action-sheet>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editing: false// 是否正在编辑
    }
  },
  props: {
    //   接受数据
    channels: {
      type: Array,
      default: () => []
      // 要求我们必须要用一个函数来声明数组类型  所以永健有函数
    }
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
