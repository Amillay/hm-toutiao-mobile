import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
export default {
  install (Vue) {
    //   插件
    Vue.prototype.$notice = (params) => Vue.prototype.$notify({ duration: 1000, ...params })
    Vue.prototype.$sleep = sleep // 封装一个休眠函数
    // 注册一个全局相对时间过滤器
    Vue.filter('relTime', relTime)
  }
}
// 休眠函数 time = 500 传了time用传的  没传用500
function sleep (time = 500) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(), time) // 等待time时间后  才能resolve
    // resolve()
  })
}
// 相对时间的过滤器 value我们认为就是时间
function relTime (value) {
  // 得到相对时间
  return dayjs().locale('zh-cn').from(value)
}
