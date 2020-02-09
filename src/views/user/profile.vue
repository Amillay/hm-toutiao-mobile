<template>
  <div class="container">
    <van-nav-bar title="编辑资料" left-arrow right-text="保存" @click-left="$router.back()" @click-right="saveUserInfo"></van-nav-bar>

     <van-cell-group>
       <!-- 头像 -->
      <van-cell is-link title="头像"  center>
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          @click="showPhoto=true"
          :src="user.photo"
        />
      </van-cell>
      <!-- 用户昵称 -->
      <van-cell is-link title="名称" :value="user.name" @click="showName=true"/>
      <!-- 性别 -->
      <van-cell is-link title="性别" @click="showGender=true" :value='user.gender === 0 ? "男" : "女"'/>
      <!-- 生日 -->
      <van-cell is-link title="生日" @click="showDate" :value="user.birthday" />
    </van-cell-group>
    <!-- 弹层组件 -->
    <van-popup v-model="showPhoto" style="width:80%">
      <!-- 1.本地2.拍照 -->
      <van-cell title="本地相册" is-link></van-cell>
      <van-cell title="拍照" is-link @click="openChangeFile"></van-cell>
    </van-popup>
    <!-- 弹昵称组件 -->
    <van-popup v-model="showName" :close-on-click-overlay="false" round>
        <!-- 编辑用户昵称 -->
        <van-field type="textarea" rows="4" style="width:80%" v-model="user.name" :error-message="nameMsg" >

        </van-field>
        <van-button type="info" size="large" @click="btnName">确定</van-button>
    </van-popup>
    <!-- 性别选择 上拉菜单  -->
    <van-action-sheet :actions="actions" v-model="showGender" cancel-text="取消" @select="selectItem">

    </van-action-sheet>
    <!-- 生日弹层 出生日期永远小于现在时间  type表示日期类型 -->
    <van-popup v-model="showBirthDay" position="bottom">
      <van-datetime-picker
      v-model="currentDate"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="showBirthDay=false"
      @confirm="confirmDate"
      />
    </van-popup>
    <!-- 设置一个文件上传控件 不能让人看到 选择文件后就会触发change -->
    <input type="file" ref="myFile" style="display:none" @change="upload">
  </div>
</template>

<script>
import dayjs from 'dayjs' // 引入dayjs
import { getUserProfile, updateImg, saveUserInfo } from '@/api/user'
export default {
  name: 'profile',
  data () {
    return {
      minDate: new Date(1900, 1, 1), // 最小时间
      maxDate: new Date(), // 最大时间   小于当前时间
      currentDate: new Date(), // 当前时间
      showBirthDay: false,
      showPhoto: false,
      showName: false,
      showGender: false, // 是否显示性别弹层
      // 定义数据
      user: {
        name: '', // 用户昵称
        gender: 0, // 0代表男1 女生
        birthday: '2019-08-08' // 默认生日
      },
      actions: [{ name: '男' }, { name: '女' }],
      nameMsg: ''// 控制显示的错误信息
    }
  },
  created () {
    this.getUserProfile()
  },
  methods: {
    // 保存方法 这里不需要传头像数据  别的方法更新的头像  photo base64字符串  this.user有photo
    async saveUserInfo () {
      try {
        await saveUserInfo({ ...this.user, photo: null })
        this.$notice({ type: 'success', message: '保存成功' })
      } catch (error) {
        this.$notice({ type: 'danger', message: '保存失败' })
      }
    },
    async upload () {
      // console.log('改变了图片');
      console.log(this.$refs.myFile.files[0])
      // 首先把图片上传到服务器上
      // 调用编辑头像的方法
      let data = new FormData()
      // formdata中添加参数
      data.append('photo', this.$refs.myFile.files[0])
      let result = await updateImg(data)
      console.log(result) // 上传头像成功之后返回的结果
      // 把地址同步设置给当前页面数据
      this.user.photo = result.photo // 将上传成功头像设置成当前头像
      this.showPhoto = false
    },
    openChangeFile () {
    //  上传本地文件
    // 触发文件上传的点击事件
    // 获取dom对象触发
      this.$refs.myFile.click()
    },
    async getUserProfile () {
      let data = await getUserProfile()
      // console.log(data)
      this.user = data
    },
    confirmDate (date) {
      // console.log(date);
      this.user.birthday = dayjs(date).format('YYYY-MM-DD') // 转成字符串日期 赋值给user中
      this.showBirthDay = false
    },
    showDate () {
      this.currentDate = new Date(this.user.birthday) // 当前生日赋值当前时间并且字符串转化日期类型
      this.showBirthDay = true
    },
    // 按钮点击事件
    btnName () {
      if (this.user.name.length < 1 || this.user.name.length > 7) {
        // 如果小于1或者大于7不符合规范
        this.nameMsg = '您的用户昵称不符合要求'
        return false
      }
      // 满足继续执行
      this.nameMsg = ''
      this.showName = false
    },
    // 点击菜单项触发该方法
    selectItem (item) {
      // console.log(item)
      this.user.gender = item.name === '男' ? 0 : 1
      this.showGender = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
