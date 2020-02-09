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

// 获取用户个人资料信息
export function getUserProfile () {
  return request({
    url: '/user/profile' // 获取用户个人资料的接口地址

  })
}

// 封装编辑用户头像
export function updateImg (data) {
  return request({
    url: '/user/photo',
    method: 'patch', // 设置头像的类型
    data
  })
}

// 封装保存用户方法
export function saveUserInfo (data) {
  return request({
    url: '/user/profile', // 编辑资料地址
    method: 'patch',
    data
  })
}
