/*
* 通过mutation间接更新state的多个方法的对象
* */
import {
    RECEIVE_GOODS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_TASK_LIST,//获取任务中心列表
} from './mutation-types'

import {
    reqGoods,
    reqLogout,
    reqUserInfo,
    reqTaskList
} from '../api'

import router from '../router'

export default {
    //异步商品信息
    async getGoods ({commit}){
        //发送异步ajax请求
        const result = await reqGoods()
        const goods = result
        commit(RECEIVE_GOODS,{goods})
        //提交一个mutation
    },

    //同步记录用户信息
    recordUser ({commit}, userInfo){
        commit(RECEIVE_USER_INFO,{userInfo})
    },

    //同步记录任务列表信息
    recordTaskList({commit},taskList){
        commit(RECEIVE_TASK_LIST,{taskList})
    },

    //异步获取用户信息 通过传递token获取用户信息
    async getUserInfo({commit}){
        const result = await reqUserInfo()
        if (result.code === 0){
            const userInfo = result.data
            commit(RECEIVE_USER_INFO,{userInfo})
        }else{
            localStorage.removeItem('user')
            router.push('/login')
        }
    },

    //异步重置用户
    async logout({commit}){
        const result = await reqLogout()
        if (result.code === 0){
            commit(RESET_USER_INFO)
            localStorage.removeItem('user')
        }
    }
}