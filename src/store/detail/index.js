//商品详细信息的请求函数
import { requestgoodsinfo, addShopcart } from '@/api/index'
//临时游客身份
import { getUuid } from '@/utils/uuid_token.js'
const state = {
    goodslists: {},
    //uuid
    uuid_token: getUuid()
}
const mutations = {
    GETFOODSINFO(state, goodslist) {
        state.goodslists = goodslist
    }
}
const actions = {
    //获取产品信息
    async getGoodsinfo({ commit }, id) {
        let res = await requestgoodsinfo(id)
        if (res.code == 200) {
            commit('GETFOODSINFO', res.data)
        }
    },
    //加入购物车
    async addShopcar({ commit }, { id, number }) {
        let res = await addShopcart(id, number)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {
    //产品路径的简化
    categoryView(state) {
        return state.goodslists.categoryView || {}
    },
    //产品信息的数据
    skuInfo(state) {
        return state.goodslists.skuInfo || {}
    },

    //产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodslists.spuSaleAttrList || []
    }

}
export default {
    state,
    mutations,
    actions,
    getters
}