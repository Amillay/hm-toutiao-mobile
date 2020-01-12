// 路由的拦截  ===>导航守卫
import router from '@/router'
import store from '@/store'
// 前置守卫、  ===>当路由发生改变之前触发   to到哪里去  执行next（） resolve这个钩子 前面不执行next后面永远不执行
// next(false) 终止当前跳转
// next(地址) 跳转另外一个地址
// next() 放行   首页不拦截   确定好要拦截的页面/user       /user/profile   /user/chat
router.beforeEach(function (to, from, next) {
  // startsWith字符串以什么开头
  // console.log(store.state)

  if (to.path.startsWith('/user') && !store.state.user.token) {
    // alert('123')
    // 拦截判断有没有token   有放行  没有的话登录
    let toPath = {
      path: '/login',
      query: {
        redirectUrl: to.path // 携带要去的地址到登录页  成功后跳转要去的地方
        // 携带当前地址到登录页  登陆成功后跳转回去
      }
    }
    // alert('23')
    next(toPath)
  } else {
    // alert('3')
    next()// 直接放行
  }
})
// 后置守卫
export default router
