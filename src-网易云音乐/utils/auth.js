import Cookies from "js-cookie";

// 创建cookie
export let setCookie = (key, value) => {
    // 创建一个有效时间为1天的cookie
    Cookies.set(key, value, { expires: 1 });
}
// 获取cookie
export let getCookie = (key) => {
    return Cookies.get(key);
}
// 删除cookie
