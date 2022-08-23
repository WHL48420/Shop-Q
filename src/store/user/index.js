//引入获取验证码的请求
import { reqcode, ruserReqister, ruserLogin, requserToken, reqLogout } from "@/api"

//引入处理token的函数
import { setToken, getTkoen, clearToken } from "@/utils/token"

const state = {
    //验证码数据
    codeList: '',
    //token数据
    // token: '',
    // token: localStorage.getItem('TOKEN'),
    token: getTkoen(),
    //用户数据
    userinfo: {}

}
const mutations = {
    //获取验证码
    GETCODELIST(state, codeList) {
        state.codeList = codeList
    },
    //用户登录token存储
    USERLOGIN(state, token) {
        state.token = token
    },
    //用户信息
    GETUSERINFO(state, userinfo) {
        state.userinfo = userinfo
    },
    //退出登录
    LOGOUT(state) {
        //清空token
        state.token = ''
            //清空用户信息
        state.userinfo = {}
            //本地清除token
        clearToken()
    }

}
const actions = {
    //获取验证码
    async getCodeList({ commit }, phone) {
        let res = await reqcode(phone)
        if (res.code == 200) {
            commit('GETCODELIST', res.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async userRegister({ commit }, data) {
        let res = await ruserReqister(data)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户登录
    async userLogin({ commit }, data) {
        let res = await ruserLogin(data)
        if (res.code == 200) {
            commit('USERLOGIN', res.data.token)
                //localStorage.setItem('TOKEN',res.data.token)
            setToken(res.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户信息
    async getUserInfo({ commit }) {
        let res = await requserToken()
        if (res.code == 200) {
            commit('GETUSERINFO', res.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //退出登录
    async logout({ commit }) {
        let res = await reqLogout()
        if (res.code == 200) {
            commit('LOGOUT')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}