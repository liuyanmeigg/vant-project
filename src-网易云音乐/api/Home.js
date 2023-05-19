import request from "@/utils/request";
// 封装网络请求的方法
// 推荐歌单的网络请求
export const recommendMusic = params => request({
    url: '/personalized',
    params
})
// 推荐新音乐的网络请求
export const hotMusic = params => request({
    url: '/personalized/newsong',
    params
})
// 之前的写法：
// export const hotMusic = function (params) {
//     return request({
//         url: '/personalized/newsong',
//         params
//     })
// }
