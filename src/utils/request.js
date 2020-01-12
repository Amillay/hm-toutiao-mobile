// 封装request模块
// 为什么封装?在拦截器里处理   token同意注入  相应数据的统一处理返回  处理大数字  token失效
import axios from 'axios'
import JSONBig from 'json-bigint'
// 导入store
import store from '@/store'
// 引入路由对象实例
import router from '@/router'

// axios.defaults是对axios本身进行改造   现在是创建了一个新的和原来的没有关系了
// 创建新的插件实例
// 给request默认请求头  baseURL
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0', // 设置常量基础地址
  transformResponse: [function (data) {
    // data是一个字符串  把字符串转为对象 并且返回
    // data是一个空字符串  直接转化会报错 //return data ? JSONBig.parse(data)
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data // 失败直接返回字符串
    }
  }]// 处理后台返回的数据   字符串转为对象   JSON.parse()  => JSONBig.parse()
})// 创建axios的请求工具

// 请求拦截器：发起请求  请求到服务器之前
instance.interceptors.request.use(function (config) {
  // 再返回配置之前  在配置里面设置token
  if (store.state.user.token) {
    // 如果存在
    config.headers['Authorization'] = `Bearer ${store.state.user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error) // 直接返回一个promise错误
})
// 响应拦截器  服务器   在then await之前
instance.interceptors.response.use(function (response) {
  // 返回得到的响应数据 第一层data是axios默认包的data 第二个是接口返回的里面包的data
  try {
    return response.data.data
  } catch (error) {
    return response.data
  }
}, async function (error) {
  // 错误的时候token容易失效具有失效问题
//   如何判断失效401状态码
  if (error.response && error.response.status === 401) {
    // 表示token过期
    // 获取当前页面地址  这里不能用this 组件实例
    let toPath = { path: '/login', query: { redirectUrl: router.currentRoute.path } }// 跳转对象
    // 先判断是否有refresh_token
    if (store.state.user.refresh_token) {
      // 应该发送一个请求换取一个新的token  使用instance这里会再次进入请求拦截器会使用原来的token
      try {
        let result = await axios({
          method: 'put',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${store.state.user.refresh_token}`
          }
        })
        store.commit('updateUser', { user: { token: result.data.data.token, refresh_token: store.state.user.refresh_token } })
        // 更新了vuex数据也更新了本地缓存数据
        return instance(error.config) // 把刚才错误的请求再次发送出去 必须要return将Promise返回
      // result是返回的结果、
        //   result.data.data.token
      } catch (error) {
        // 错误就是不就措施没有用了refresh_token也进行失效了
        store.commit('delUser')
        router.push(toPath) // 跳转登录
      }
    } else {
      // 如果连refresh_token都没有  进行跳转
      // 当访问页面是让你去登陆，登陆成功后  应该回到之前的页面
      // 记住当前地址回到之前页面
      // params 动态路由  user/:id   query 传参  user? id= 123

      // router.currentRoute.path
      // push除了可以是字符串还可以是一个对象router.push({path:'/login',query:{}})
      router.push(toPath)
    }
  }
  return Promise.reject(error)
})
// 使用进行导出
export default instance // 导出request工具
