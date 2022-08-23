import { reqCartList, reqDeleteCart, reqIsChecked } from '@/api/index'

const state = {
    cartlist: []
}
const mutations = {
    GETSHOPCART(state, cartlist) {
        state.cartlist = cartlist
    }
}
const actions = {
    //获取购物车数据
    async getShopCart({ commit }) {
        1
        let res = await reqCartList()
        if (res.code == 200) {
            commit('GETSHOPCART', res.data)
        }
    },
    //删除购物车某一个商品
    async removeShopcart({ commit }, skuid) {
        let res = await reqDeleteCart(skuid)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //修改勾选状态
    async changeIsChecked({ commit }, { skuId, isChecked }) {
        let res = await reqIsChecked(skuId, isChecked)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //删除选中的购物车商品
    deleteAllIschecked({ dispatch, getters }) {
        let PromiseAll = []
            //购物车商品有多少   就执行几次循环
        getters.cartlist.cartInfoList.forEach(item => {
            if (item.isChecked == 1) {
                dispatch('removeShopcart', item.skuId)
                    //返回的是promise对象
                let promise = dispatch('removeShopcart', item.skuId)
                    //PromiseAll = [promise，promise，promise]
                PromiseAll.push(promise)
            }
        });
        //Promise.all(p1,p2,p3)
        return Promise.all(PromiseAll)
    },
    //全选状态
    AllisCheckedcative({ dispatch, state }, isChecked) {
        let promiseAll = []
        state.cartlist[0].cartInfoList.forEach(item => {
            dispatch('changeIsChecked', { skuId: item.skuId, isChecked })
            let promise = dispatch('changeIsChecked', { skuId: item.skuId, isChecked })
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }

}
const getters = {
    cartlist(state) {
        //购物车的数据cartInfoList || []
        return state.cartlist[0] || {} //.cartInfoList || []
    },

}
export default {
    state,
    mutations,
    actions,
    getters
}