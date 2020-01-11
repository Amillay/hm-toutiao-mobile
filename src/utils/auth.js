// 专门处理用户信息的存储和删除以及获取  放置在localstorge
const USER_TOKEN = 'hm-tt-mobile-91'
// 这个key专门用来存储用户信息
//  设置用户信息
export function setUser (user) {
  localStorage.setItem(USER_TOKEN, JSON.stringify(user))
}
// 读取用户信息
export function getUser () {
  JSON.parse(localStorage.getItem(USER_TOKEN) || '{}') // 短路表达式
}

// 删除用户信息
export function delUser () {
  localStorage.removeItem(USER_TOKEN)
}
