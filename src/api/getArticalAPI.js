import request from '@/api/request'
export const getArticalListAPI = function (params) {
    return request.get('/backstage/doctorManage/orgList', {
        params,
    })

}
