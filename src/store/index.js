import Vue from "vue";
import VueX from 'vuex'

//需要使用插件一次
Vue.use(VueX)

//引入小仓库
import home from '@/store/home'
import search from '@/store/search'
import detail from "@/store/detail";
import shopcart from "@/store/shopcart";
import user from "./user";
import trade from "./trade";
export default new VueX.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
});