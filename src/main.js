import Vue from 'vue'
import App from './App.vue'
import router from './permission'
// import '@/permission' 或者也可以这样
import store from './store'

import Vant from 'vant'

import plugin from '@/utils/plugin'

// 导入所有组件
import 'vant/lib/index.less'

// 全局样式放在vant样式下面
import '@/style/index.less'

// 引入基准值实时改变  自动适配插件先进行下载安装
import 'amfe-flexible'

Vue.use(Vant)
// 完成注册在任意位置就可以使用vant组件库的组件   按需引用没必要在开发阶段引入
Vue.use(plugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
