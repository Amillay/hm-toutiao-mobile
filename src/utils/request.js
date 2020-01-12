// 封装request模块
// 为什么封装?在拦截器里处理   token同意注入  相应数据的统一处理返回  处理大数字  token失效
import axios from 'axios'
import JSONBig from 'json-bigint'
// 导入store
import store from '@/store'

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
}, function (error) {
  // 错误的时候token容易失效具有失效问题
  return Promise.reject(error)
})
// 使用进行导出
export default instance // 导出request工具
