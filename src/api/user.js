// 用户请求模块
import request from "@/utils/request";
import store from "@/store";
// 用户登录请求
export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}
// 发送验证码
export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `/app/v1_0/user/${mobile}`,
    })
}
// 获取用户自己的信息
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: `/v1_0/user`
        // 发送请求头数据
        // headers: {
        //     // 注意：该接口需要授权才能访问
        //     // Authorization 是后端要求的名字 值也是后端要求要传输的格式和内容
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}
// 获取用户频道列表
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels'
    })
}
//关注用户
export const addFollow = (target) => {
    return request({
        method: 'POST',
        url: '/v1_0/user/followings',
        data: {
            target
        }
    })
}
// 文章 - 取消关注作者
export const deleteFollow = (target) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/followings/${target}`,
    })
}
// 获取-用户个人简介
export const getUserProfile = () => {
    return request({
        method: 'GET',
        url: `/v1_0/user/profile`,
    })
}
// 更新-用户个人简介
export const updateUserProfile = (data) => {
    return request({
        method: 'PATCH',
        url: `/v1_0/user/profile`,
        data
    })
}
// 更新-用户头像
export const updateUserAvatar = (data) => {
    return request({
        method: 'PATCH',
        url: `/v1_0/user/photo`,
        data
    })
}
// 获取-用户关注列表
export const getUserAttention = () => {
    return request({
        method: 'GET',
        url: `/v1_0/user/followings`
    })
}
// 获取-用户关注列表
export const getUserFans = () => {
    return request({
        method: 'GET',
        url: `/v1_0/user/followers`
    })
}
