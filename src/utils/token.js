//存储token
export const setToken = (token) => {
    localStorage.setItem('TOKEN', token)
}

//使用token
export const getTkoen = () => {
    return localStorage.getItem('TOKEN')
}

//清除token
export const clearToken = () => {
    localStorage.removeItem('TOKEN')
}