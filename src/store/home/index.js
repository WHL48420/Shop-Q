//home小仓库的数据
import { reqCategoryList, Mockbanner, MockFloor } from '@/api'
const state = {
    //按照服务器返回的数据类型定义初始值
    //三级菜单的数据
    CategoryList: [],
    //轮播图的数据
    bannerList: [],
    //floor的数据
    FloorList: []
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        //获取数据的1---17个   不要第一个   第一个瞎改了
        state.CategoryList = categoryList.splice(1, 17)
    },
    MOCKBANNERDATA(state, bannerList) {
        state.bannerList = bannerList
    },
    MOCKFloorDATA(state, FloorList) {
        state.FloorList = FloorList
    }
}
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async CategoryList({ commit }) {
        let res = await reqCategoryList()
        if (res.code === 200) {
            commit('CATEGORYLIST', res.data)
        }
    },
    async MockBannerData({ commit }) {
        let res = await Mockbanner()
        if (res.code === 200) {
            commit('MOCKBANNERDATA', res.data)
        }
    },
    async MockFloorData({ commit }) {
        let res = await MockFloor()
        if (res.code === 200) {
            commit('MOCKFloorDATA', res.data)
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