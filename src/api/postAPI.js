import request from '@/api/request'
export const postAPI = function (orgGuids) {
    return request.post('/backstage/doctorManage/orgDel', { orgGuids: orgGuids })

}