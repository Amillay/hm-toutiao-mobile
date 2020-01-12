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
