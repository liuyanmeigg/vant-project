import axios from "axios";
// 实例对象
const request = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})
// 请求拦截器
request.interceptors.request.use((config) => {
    return config
}, e => Promise.reject(e))
// 响应拦截器
request.interceptors.response.use(res => res.data, e => {
    return Promise.reject(e)
})
export default (method, url, data) => {
    return request({
        url,
        method,
        [method.toLowerCase() === 'get' ? 'params' : 'data']: data
    })
}