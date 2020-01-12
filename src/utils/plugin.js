export default {
  install (Vue) {
    //   插件
    Vue.prototype.$notice = (params) => Vue.prototype.$notify({ duration: 1000, ...params })
    // Vue.prototype.$notify
  }
}
