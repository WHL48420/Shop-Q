//引入路由插件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess/index.vue'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
//懒加载
const Center = () => {
        return import ('@/pages/Center')
    }
    // import Center from '@/pages/Center'


//二级路由
import myOrder from '@/pages/Center/myOrder'
import TeamOrder from '@/pages/Center/TeamOrder'

export default [{
        path: '/home',
        //路由懒加载
        component: () =>
            import ('@/pages/Home'),
        meta: { show: true }
    }, {
        path: '/login',
        component: Login,
        meta: { show: false }
    }, {
        path: '/search/:keyword?',
        name: 'search',
        component: Search,
        meta: { show: true },
    }, {
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    {
        path: '/detail/:id',
        component: Detail,
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        name: 'AddCartSuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: '/trade',
        component: Trade,
        name: 'Trade',
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //必须从购物车而来
            if (from.path == '/shopcart') {
                next()
            } else {
                //返回来的路由
                next(false)
            }
        }
    },
    {
        path: '/pay',
        component: Pay,
        name: 'Pay',
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //必须从交易页而来
            if (from.path == '/trade') {
                next()
            } else {
                //返回来的路由
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        name: 'PaySuccess',
        meta: { show: true }
    },
    {
        path: '/center',
        component: Center,
        name: 'Center',
        meta: { show: true },
        //二级路由
        children: [{
            path: 'myorder',
            component: myOrder
        }, {
            path: 'teamorder',
            component: TeamOrder
        }, {
            path: '/center',
            redirect: '/center/myorder'
        }]
    },
    //重定向到首页
    {
        path: '*',
        redirect: '/home'
    }
]