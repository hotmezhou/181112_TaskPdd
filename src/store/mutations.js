/*
* 直接更新state的多个方法的对象
* */
import {
    RECEIVE_GOODS
    ,RECEIVE_USER_INFO
    ,RESET_USER_INFO
    ,RECEIVE_TASK_LIST //接收任务中心列表
} from './mutation-types'

export default {
    [RECEIVE_GOODS] (state, {goods}){
        state.goods = goods
    },
    [RECEIVE_USER_INFO] (state, {userInfo}){
        state.userInfo = userInfo
    },
    [RESET_USER_INFO] (state){
        state.userInfo = {}
    },
    [RECEIVE_TASK_LIST] (state, {taskList}){
        state.taskList = taskList
    }

}