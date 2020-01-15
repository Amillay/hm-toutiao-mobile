// 用于文章数据获取
import request from '@/utils/request'

// 获取推荐文章的数据query 放置在params  boay放置在data上
export function getArticles (params) {
  return request({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: { with_top: 1, ...params }
  })
}
// 不喜欢文章接口
export function disLikeArticle (data) {
  return request({
    url: '/article/dislikes',
    method: 'post',
    data
  })
}

// 封装举报文章的接口
export function reportArticle (data) {
  return request({

    url: '/article/reports',
    mythod: 'post',
    data
  })
}
