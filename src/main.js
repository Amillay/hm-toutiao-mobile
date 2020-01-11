import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'

// 导入所有组件
import 'vant/lib/index.css'
Vue.use(Vant)
// 完成注册在任意位置就可以使用vant组件库的组件   按需引用没必要在开发阶段引入

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
