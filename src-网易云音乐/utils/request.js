import axios from 'axios'
// create() 自定义axios对象
const request = axios.create({
    baseURL: 'http://localhost:3000'
    // 服务器地址
})
export default request