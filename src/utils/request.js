// 请求模块
import axios from "axios";
import store from "@/store";
import JSONBig from 'json-bigint'
// JSONBig 可以处理数据中超出JS安全数据范围的问题
const request = axios.create({
    baseURL: ' http://toutiao.itheima.net', //接口统一的前缀地址
    // 定义后端返回的原始数据
    // data:后端返回的原始数据，说白了就是JSON格式的字符串
    transformResponse: [function (data) {
        // axios 默认会在部内部这样来处理后端返回的数据
        // return JSON.parse(data)
        try {
            return JSONBig.parse(data) //自定义处理方式
        } catch (err) {
            return data
        }
    }],
})

// 请求拦截器
request.interceptors.request.use(function (config) {
    // config 本次请求的请求配置对象
    // 请求发起会经过这里
    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    // 注意：这里必须return出去config配置对象，否则请求就停在这里出不去了
    return config;
}, function (error) {
    // 如果请求出错了（还没有发出去）会进入这里（一般代码不用动）
    return Promise.reject(error); //把错去继续往外抛出，由真正调用的地方自行处理错误
});
// 响应拦截器

export default request