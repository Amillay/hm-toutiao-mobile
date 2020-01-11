import Vue from 'vue'
import Vuex from 'vuex'
// import{getUser} from '地址'
import * as auth from '@/utils/auth'
Vue.use(Vuex)
// vuex和缓存数据的同步  先读取设置再清空
export default new Vuex.Store({
  // 放置数据
  state: {
    user: auth.getUser()
  },
  // 修改必须通过mutations payload载荷中携带user
  mutations: {
    updateUser (state, payload) {
      state.user = payload.user// 更新数据
      auth.setUser(payload.user) // 数据同步到本地存储
    },
    clearUser (state) {
      state.user = {}
      auth.delUser() // 清空缓存中的数据
    }
  },
  actions: {
  },
  modules: {
  }
})
