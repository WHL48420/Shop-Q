//当前模块对API进行统一管理
import requests from "./request";

import MockRequest from './MockRequest'
//一级联动接口
///api/product/getBaseCategoryList   get   参数无

//分别暴露  引入需要加入{ }
export const reqCategoryList = () => {
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}

//轮播图的数据
export const Mockbanner = () => {
        return MockRequest({
            url: '/banner',
            method: 'get'
        })
    }
    //Floor的数据
export const MockFloor = () => {
    return MockRequest({
        url: '/floor',
        method: 'get'
    })
}

//search模块的数据     url：/api/list    post   参数：10个
//注意：搜索的接口，需要传递参数，至少是一个空对象（KV没有，但是至少给服务器一个对象）  不然获取到数据
export const requestSearchinfo = (data) => {
    return MockRequest({
        url: '/list',
        method: 'post',
        data
    })
}
export const requestSearchinfos = (data) => {
    return requests({
        url: '/list',
        method: 'post',
        data
    })
}

//detail获取商品详情的数据    /api/item/{skvId}   get   
export const requestgoodsinfo = (skvId) => {
    return requests({
        url: `/item/${skvId}`,
        method: 'get',

    })
}

//加入购物车的数据  /cart/addToCart/${id}/${number}    /post
export const addShopcart = (id, number) => {
    return requests({
        url: `/cart/addToCart/${id}/${number}`,
        method: 'post'
    })
}

//获取购物车的数据  /api/cart/cartList   get
export const reqCartList = () => {
    return requests({
        url: '/cart/cartList',
        method: 'get'
    })
}

//删除购物车某一个商品的数据    `/cart/deleteCart/${skuId}`   delete

export const reqDeleteCart = (skuId) => {
    return requests({
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete'
    })
}

//修改勾选状态 `/cart/deleteCart/${skuId}/${isChecked}`   get
export const reqIsChecked = (skuId, isChecked) => {
    return requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    })
}


//获取验证码  /user/parport/sendCode/{phone}   get
export const reqcode = (phone) => {
    return requests({
        url: `/user/passport/sendCode/${phone}`,
        method: 'get'
    })
}

//用户注册   /user/passport/register    post   参数  phone  code  password
export const ruserReqister = (data) => {
    return requests({
        url: '/user/passport/register',
        method: 'post',
        data
    })
}

//登录的接口  user/passport/login   post     phone  password
export const ruserLogin = (data) => {
    return requests({
        url: '/user/passport/login',
        method: 'post',
        data
    })
}

//跳转到首页的用户信息   /user/passport/auth/getUserInfo    get     token
export const requserToken = () => {
    return requests({
        url: '/user/passport/auth/getUserInfo',
        method: 'get',
    })
}

//退出登录   /user/passport/logout   get 
export const reqLogout = () => {
    return requests({
        url: '/user/passport/logout',
        method: 'get',
    })
}

//获取用户地址信息  user/userAddress/auth/findUserAddressList    get
// export const reqUserhome = () => {
//         return requests({
//             url: 'user/userAddress/auth/findUserAddressList',
//             method: 'get',
//         })
//     }

//mock
export const reqUserhome = () => {
        return MockRequest({
            url: 'user/userAddress/auth/findUserAddressList',
            method: 'get',
        })
    }
    //获取商品清单   order/auth/trade    get
export const reqUserCart = () => {
    return requests({
        url: 'order/auth/trade',
        method: 'get',
    })
}

//提交订单  /api/order/auth/submitOrder?tradeNo={tradeNo}    post
export const reqUserPay = (tradeNo, data) => {
    return requests({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method: 'post',
        data
    })
}

//获取订单数据  /api/payment/weixin/createNative/{orderId}   get   orederId
export const reqPaydata = (orderId) => {
    return requests({
        url: `/payment/weixin/createNative/${orderId}`,
        method: 'get',
    })
}

//查询支付结果
export const reqPayActions = (orderId) => {
    return requests({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: 'get',
    })
}

//获取个人中心的数据  api/order/auth/{page}/{limit}   get  页码  每页展示数据
export const reqMyorderdata = (page, limit) => {
    return requests({
        url: `/order/auth/${page}/${limit}`,
        method: 'get',
    })
}