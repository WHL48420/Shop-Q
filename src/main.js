import Vue from 'vue'
import App from './App.vue'

//引入elementui  按需引入
import { Button, MessageBox } from 'element-ui';
Vue.use(Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入懒加载图片
import logo from '@/assets/logo.png'
//图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    loading: logo
})

//表单验证插件
import '@/plugins/vee'

//二级联动的全局组件
import TypeNav from '@/components/TypeNav/TypeNav'
Vue.component(TypeNav.name, TypeNav)
    //轮播图的全局组件
import Carousel from '@/components/Carousel/Carousel'
Vue.component(Carousel.name, Carousel)
    //分页器的全局组件
import Pagintion from '@/components/Pagintion/Pagintion'
Vue.component(Pagintion.name, Pagintion)

//引入路由   //注册路由功能
import router from '@/router'

//引入仓库
import store from './store'
//测试发请求 
// import { reqCategoryList } from '@/api/index.js'
// reqCategoryList()
// import { requestSearchinfo } from '@/api/index.js'
// console.log(requestSearchinfo({}));

//统一引入api接口
import * as Http from '@/api'

//引入mockServe.js文件
import '@/mock/mockServe'

//引入swiper样式文件
import 'swiper/css/swiper.css'

Vue.config.productionTip = false

new Vue({
    //下面代码作用:给项目添加路由功能,给全部VC实例身上拥有两个属性,$router|$route
    router,
    //注册仓库，组件实例上面多了$store属性
    store,
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$Http = Http
    }
}).$mount('#app')







// let obj1 = { a: 1, b: 2, c: 0 }
// let obj2 = { b: 2, c: 3 }
// let obj3 = { c: 3 }
// let obj4 = Object.assign(obj1, obj2, obj3)
// console.log(obj4);