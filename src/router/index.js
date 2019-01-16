import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/Home'
import Invite from '@/pages/Invite/Invite'
import Order from '@/pages/Order/Order'
import Task from '@/pages/Task/Task'
import User from '@/pages/User/User'
import Login from '@/pages/Login/Login'
import Detail from '@/pages/Order/Detail/Detail'
import Recharge from '@/pages/Recharge/Recharge'
import Record from '@/pages/Record/Record'
import RecordBill from '@/pages/Record/Bill/Bill'
import RecordCash from '@/pages/Record/Cash/Cash'
import RecordRecharge from '@/pages/Record/Recharge/Recharge'
import Cash from '@/pages/Cash/Cash'


Vue.use(Router)

const router = new Router({
    routes: [
        {path: '/', redirect: '/home'},
        {
            path: '/home',
            name: 'Home',
            component: Home,
            meta:{
                showFooter: true
            }
        },
        {
            path: '/invite',
            name: 'Invite',
            component: Invite,
            meta:{
                showFooter: true,
                requireAuth: true
            }
        },
        {
            path: '/order',
            name: 'Order',
            component: Order,
            meta:{
                showFooter: true,
                requireAuth: true
            }
        },
        {
            path: '/detail/:id',
            name: 'Detail',
            component: Detail,
            meta:{
                showFooter: true,
                requireAuth: true
            }
        },
        {
            path: '/task',
            name: 'Task',
            component: Task,
            meta:{
                showFooter: true,
                requireAuth: true
            }
        },
        {
            path: '/user',
            name: 'User',
            component: User,
            meta:{
                showFooter: true,
                requireAuth: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta:{
                showFooter: true,
            }
        },{
            path: '/recharge',
            name: 'Recharge',
            component: Recharge,
            meta:{
                showFooter: true,
                requireAuth: true
            }
        },{
            path: '/cash',
            name: 'Cash',
            component: Cash,
            meta:{
                showFooter: true,
                requireAuth: true
            }
        },{
            path: '/record',
            name: 'Record',
            component: Record,
            meta:{
                showFooter: true,
                requireAuth: true
            },
            children:[
                {
                    path: '/record/bill',
                    component: RecordBill,
                    meta:{
                        showFooter: true,
                    }
                },
                {
                    path: '/record/cash',
                    component: RecordCash,
                    meta:{
                        showFooter: true,
                    }
                },
                {
                    path: '/record/recharge',
                    component: RecordRecharge,
                    meta:{
                        showFooter: true,
                    }
                },
                {
                    path: '',
                    redirect: '/record/bill'
                }
            ]
        }
    ],
})

router.beforeEach((to,from,next) => {
    // 发送请求来获取服务器登录状态
    let user = localStorage.getItem('user')
    if (user){
        next();
    } else{
        if (to.path === '/login' || to.path === '/home'){
            next()
        }else{
            next('/login');
        }
    }
})

export default router
