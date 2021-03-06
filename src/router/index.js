import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '@/views/home'

// 按需加载
const Layout = () => import('@/views/layout')
const Home = () => import('@/views/home')
const Question = () => import('@/views/question')
const Video = () => import('@/views/video')
const User = () => import('@/views/user')
const Profile = () => import('@/views/user/profile')
const Chat = () => import('@/views/user/chat')
const Login = () => import('@/views/login')
const Article = () => import('@/views/article')
const Search = () => import('@/views/search')
const SearchResult = () => import('@/views/search/result')

Vue.use(VueRouter)

const routes = [
  {
    // meta是route信息里面一个属性存放数据切换时进行使用
    path: '/',
    name: 'layout',
    component: Layout,

    children: [
      {
        path: '/',
        component: Home,
        // meta属性存在二级路由并且path相同情况下，需要写到二级路由下
        meta: {
          isAlive: true // 是否缓存组件实例
        }
      },
      {
        path: '/question',
        component: Question
      },
      {
        path: '/video',
        component: Video
      },
      {
        path: '/user',
        component: User
      }
    ] },
  {
    path: '/user/profile',
    component: Profile
  },
  {
    path: '/user/chat',
    component: Chat
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/article',
    component: Article
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/search/result',
    component: SearchResult
  }

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
