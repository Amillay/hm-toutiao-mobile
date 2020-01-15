// 专门处理频道的请求
import request from '@/utils/request'

import store from '@/store'
// 获取我的频道
// 本地缓存 需要key
const CACHE_CHANNEL_T = 'hm-91-t' // 游客缓存的key
const CACHE_CHANNEL_U = 'hm-91-u' // 登录用户的key

export function getMyChannels () {
  // 返回一个promise对象  axios默认是get请求
  // 应该先从缓存中读取看看缓存中有没有  缓存中有的话用缓存的数据  没有才去查询
  // 还要注意读取缓存数据的时候还要区分是游客还是登录用户
  // return request({
  //   url: '/user/channels'
// 这样不能满足需求
  // })
  return new Promise(async function (resolve, reject) {
    let key = store.state.user.token ? CACHE_CHANNEL_U : CACHE_CHANNEL_T
    // 从缓存中读取数据
    let str = localStorage.getItem(key) // 得到缓存结果

    if (str) {
      // 存在表示缓存中有数据
      resolve({ channels: JSON.parse(str) })
    } else {
      // 如果没有数据
      const data = await request({
        url: '/user/channels'

      })
      localStorage.setItem(key, JSON.stringify(data.channels))// 将线上数据写到缓存
      resolve(data) // 将线上获取的数据释放下给promise
    }
  })
}

// 获取所有频道
export function getAllChannels () {
  return request({
    url: '/channels'
  })
}

// 本地化删除删除频道  封装本地化
export function delChannel (id) {
  return new Promise(function (resolve, reject) {
    // 首先判断是删除游客频道还是登陆频道
    let key = store.state.user.token ? CACHE_CHANNEL_U : CACHE_CHANNEL_T
    let channels = JSON.parse(localStorage.getItem(key))
    let index = channels.findIndex(item => item.id === id)
    if (index > -1) {
      // 删除数据
      channels.splice(index, 1) // 直接删除原数组中数据第一种
      // channels = channels.filter(item => item.id !== id) //新数组模式去删除要删除的数据  第二种方法
      // 应该重新写入缓存
      localStorage.setItem(key, JSON.stringify(channels))
      resolve()
    } else {
      reject(new Error('找不到对应频道'))
    }
  })
}
