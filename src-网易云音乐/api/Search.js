import request from "@/utils/request";
export const topSearch = () => request({
    url: '/search/hot'
})
export const searchSongs = params => request({
    url: '/cloudsearch',
    params
})