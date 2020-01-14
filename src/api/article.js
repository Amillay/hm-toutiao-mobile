// 用于文章数据获取
import request from '@/utils/request'

// 获取推荐文章的数据query 放置在params  boay放置在data上
export function getArticles (params) {
  return request({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: { with_top: 1, ...params }
  })
}
