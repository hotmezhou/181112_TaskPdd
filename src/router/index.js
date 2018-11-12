import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/Home'
import Invite from '@/pages/Invite/Invite'
import Order from '@/pages/Order/Order'
import Task from '@/pages/Task/Task'
import User from '@/pages/User/User'
import Login from '@/pages/Login/Login'

Vue.use(Router)

export default new Router({
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
                showFooter: true
            }
        },
        {
            path: '/order',
            name: 'Order',
            component: Order,
            meta:{
                showFooter: true
            }
        },
        {
            path: '/task',
            name: 'Task',
            component: Task,
            meta:{
                showFooter: true
            }
        },
        {
            path: '/user',
            name: 'User',
            component: User,
            meta:{
                showFooter: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})