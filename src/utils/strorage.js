// 获取本地存储数据
export const getItem = (key) => {
    const data = window.sessionStorage.getItem(key)
    try {
        return JSON.parse(data)
    } catch {
        return data
    }
}
// 存储本地数据
export const setItem = (key, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    window.sessionStorage.setItem(key, value)
}
// 删除本地数据
export const removeItem = key => {
    window.sessionStorage.removeItem(key)
}