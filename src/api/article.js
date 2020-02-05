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
    method: 'post',
    data
  })
}

// 联想搜索建议
export function suggestion (params) {
  return request({
    url: '/suggestion',
    params
  })
}

// 获取文章搜索的结果
export function searchArticle (params) {
  return request({
    url: '/search',
    params
  })
}

// 获取文章详情
// 埋点：网站用户调研，网站的使用及分析
export function getArticleInfo (articleId) {
  return request({
    url: `/articles/${articleId}`

  })
}

// 获取评论  或者评论回复
export function getComments (params) {
  return request({
    url: '/comments', // 请求地址
    // query放置params
    // body参数放在data
    params
  })
}
// 封装一个评论或者回复评论方法

export function commentOrReply (data) {
  return request({
    url: '/comments', // 请求地址
    method: 'post', // 请求类型不同
    data
  })
}
