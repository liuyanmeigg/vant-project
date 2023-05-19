import request from "@/utils/request";
//  评论 - 获取列表
export const getCommentList = (params) => {
    return request({
        method: 'GET',
        url: '/v1_0/comments',
        params
    })
}
// 评论点赞
export const commentLiked = (target) => {
    return request({
        method: 'POST',
        url: '/v1_0/comment/likings',
        data: { target }
    })
}
// 评论-取消点赞
export const delCommentLiked = (target) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/comment/likings/${target}`,
    })
}
// 评论 - 发布/回复
export const addComment = (data) => {
    return request({
        method: 'POST',
        url: `/v1_0/comments`,
        data
    })
}
