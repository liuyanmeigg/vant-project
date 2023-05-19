// 文章请求模块
import request from "@/utils/request";
// 请求获取文章列表
export const getArticals = (params) => {
    return request({
        method: 'GET',
        url: '/v1_0/articles',
        params
    })
}
// 文章_不感兴趣
export const articleDislike = (data) => {
    return request({
        method: 'POST',
        url: '/v1_0/article/dislikes',
        data
    })
}
//获取新闻文章详情
export const getArticleById = (id) => {
    return request({
        method: 'GET',
        url: `/v1_0/articles/${id}`,
    })
}
// 文章 - 喜欢
export const likeArticle = (target) => {
    return request({
        method: 'POST',
        url: `/v1_0/article/likings`,
        data: {
            target
        }
    })
}
// 文章 - 取消喜欢
export const delLikeArticle = (id) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/likings/${id}`,
    })
}
// 文章-收藏
export const collectedArt = (target) => {
    return request({
        method: 'POST',
        url: `/v1_0/article/collections`,
        data: {
            target
        }
    })
}
// 文章 - 取消收藏
export const delCollectedArt = (target) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/collections/${target}`,
    })
}
// 获取-用户阅读历史
export const getArticleHistory = (data) => {
    return request({
        method: 'GET',
        url: `/v1_0/user/histories`,
        data
    })
}
