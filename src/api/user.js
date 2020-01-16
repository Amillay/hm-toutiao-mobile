// 用户相关的请求模块
import request from '@/utils/request'
// query参数  body参数
export function login (data) {
  return request({
    url: '/authorizations',
    data,
    method: 'post'
  }) // 得到一个promise对象
}

// 关注用户
export function followUser (data) {
  return request({
    url: '/user/followings',
    method: 'post',
    data
  })
}
// 取关用户
export function unFollowUser (target) {
  return request({
    url: `/user/followings/${target}`,
    method: 'delete'
  })
}

// 获取用户自己信息
export function getUserInfo () {
  return request({
    url: '/user'
  })
}
