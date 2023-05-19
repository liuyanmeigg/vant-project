// 获取搜索请求模块
import request from "@/utils/request";
// 获取搜索建议-联想菜单
export const getSearchSuggestions = params => {
    return request({
        method: 'GET',
        url: '/v1_0/suggestion',
        params
    })
}
// 搜索_结果列表
export const getSearchResult = params => {
    return request({
        method: 'GET',
        url: '/v1_0/search',
        params
    })
}