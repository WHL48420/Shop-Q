//引入用户地址和商品清单的请求函数
import { reqUserhome, reqUserCart } from '@/api'

const state = {
    //地址信息
    homesList: [],
    //商品清单
    goodsList: {}
}
const mutations = {
    //获取地址
    GETUSERHOME(state, homesList) {
        state.homesList = homesList
    },
    //获取商品清单
    GETUSERCART(state, goodsList) {
        state.goodsList = goodsList
    }
}
const actions = {
    //获取地址
    async getUserHome({ commit }) {
        let res = await reqUserhome()
        if (res.code == 200) {
            commit('GETUSERHOME', res.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //获取商品清单
    async getUserCart({ commit }) {
        let res = await reqUserCart()
        if (res.code == 200) {
            commit('GETUSERCART', res.data)
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