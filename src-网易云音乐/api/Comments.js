import request from "@/utils/request";
export const getComments = params => request({
    url: '/comment/music',
    params
})