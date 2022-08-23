//对于axios进行二次封装
import axios from "axios";

//引入store仓库
import store from "@/store";

//引入进度条
import nprogress from "nprogress";
//start:进度条开始
//done:进度条结束

//引入进度条的样式
import 'nprogress/nprogress.css'

//1.利用axios对象的create 方法  去创建一个个axios实例
//2.request就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径  发送请求的时候都会自己带上/api   不用自己书写
    //以前发请求  http://xxxxxxx/api/card   配置基础路径之后：http://xxxxxxx/card
    baseURL: '/api',
    //超时
    timeout: 5000
})


// 请求拦截器
// 请求之前处理一些事情
requests.interceptors.request.use(config => {
    // console.log(store);
    //携带uuid
    if (store.state.detail.uuid_token) {
        //userTempId 为后端定义好的
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //携带token
    if (store.state.user.token) {
        //userTempId 为后端定义好的
        config.headers.token = store.state.user.token
    }
    nprogress.start()
        // config:配置对象，对象有个属性很重要，headers请求头

    return config
})

//响应拦截器
//服务器响应之前处理一些事情
requests.interceptors.response.use((res) => {
    nprogress.done()
        //成功的回调函数，服务器响应数据回来以后，可以做一些事情
    return res.data
}, (error) => {
    // 失败的回调函数
    console.log('err');
    return Promise.reject(new Error('faile'))
})

export default requests