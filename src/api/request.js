import axios from 'axios'
const request = axios.create({
    baseURL: '/bmda',

})
export default request