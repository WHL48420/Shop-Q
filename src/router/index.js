//配置路由
//第一步：引入插件、安装插件
import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);

import routes from "./routes";


//引入仓库
import store from '@/store'




let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//VueRouter.prototype原型对象添加一个方法
//location:路由跳转相关的信息
VueRouter.prototype.push = function(location, resolve, reject) {
    //当前函数this：即为VueRouter类的实例
    //相当于push方法里面this，是windows【完犊子了】
    //利用人家push方法实现路由跳转，保证push里面this,应该vueRouter类的实例

    //面试:函数apply与call区别?
    //相同的地方:都可以篡改函数里面this
    //不同的地方:apply传递参数 数组  call传递参数 逗号分割

    if (resolve && reject) {
        //代表真:代表着两个形参接受参数【箭头函数】
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {}, () => {});
    }
}


VueRouter.prototype.replace = function(location, resolve, reject) {
        if (resolve && reject) {
            //代表真:代表着两个形参接受参数【箭头函数】
            originReplace.call(this, location, resolve, reject);
        } else {
            originReplace.call(this, location, () => {}, () => {});
        }
    }
    //第二步:暴露VueRouter类的实例
    //对外暴露一个路由器,实质是VueRouter类的实例,一个路由器可以管理多个路由
const router = new VueRouter({
    //配置路由
    routes,
    scrollBehavior() {
        //滚动行为这个函数,需要有返回值,返回值为一个对象。
        //经常可以设置滚动条x|y位置 [x|y数值的设置一般最小是零]
        return { y: 0 };
    },

});

router.beforeEach(async(to, from, next) => {
    //获取仓库的token
    let token = store.state.user.token
        // let name = store.state.user.userinfo.name
        //获取仓库的userinfo是否为空
    let name = Object.keys(store.state.user.userinfo).length !== 0
    if (token) {
        //已经登录  不去登录页   跳去首页
        if (to.path == '/login') {
            next('/home')
        } else {
            //已经登录  不去登录页  判断有没有用户信息
            //如果有   放行
            if (name) {
                next()
                    //如果没有  给你请求过来  放行
            } else {
                try {
                    //登录了  name请求成功了   放行
                    await store.dispatch('getUserInfo')
                    next()

                } catch (error) {
                    //登录了  name请求成功了   但是token失效了  清空token 返回login
                    //退出
                    await store.dispatch('logout')
                    next('/login')
                }
            }
        }
        //如果没有登录  放行  随便浏览
    } else {
        //暂时不处理   如果不登录
        //用户未登录||目前的判断都是放行.将来这里会'回手掏'增加一些判断
        //用户未登录:不能进入/trade、/pay、/paysuccess、/center、/center/myorder  /center/teamorder
        let toPath = to.path;
        if (toPath.indexOf('trade') != -1 ||
            toPath.indexOf('pay') != -1 ||
            toPath.indexOf('center') != -1) {
            next('/login?redirect=' + toPath);
        } else {
            next();
        }
    }
})

export default router;



// let obj = { 1: 1, 2: 2, 3: 0 }
// console.log(Object.keys(obj));