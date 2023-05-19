import request from "@/utils/request";
//  获取所有频道列表
export const getAllChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/channels'
    })
}
// 添加用户频道
export const addUserChannels = data => {
    return request({
        method: 'PUT',
        url: '/v1_0/user/channels',
        data
    })
}
// 删除用户频道
export const deleteUserChannels = channelId => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/channels/${channelId}`
    })
}