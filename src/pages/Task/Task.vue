<template>
    <div class="task">
        <home-header>
            <span slot="icon-left">
                <a href="javascript:;" @click="$router.back()">
                    <i class="iconfont icon-return"></i>
                </a>
            </span>
            <span slot="title">任务大厅</span>
        </home-header>
        <!--快报-->
        <div class="rollnotice">
            <yd-rollnotice autoplay="2000" >
                <yd-rollnotice-item><span style="color:#F00;"> 新用户注册请先实名认证！</span></yd-rollnotice-item>
                <yd-rollnotice-item><span style="color:#F00;"> 下单时请勿使用任何优惠券，检测到或投诉，封号处理。 </span></yd-rollnotice-item>
            </yd-rollnotice>
        </div>
        <!--任务列表-->
        <task-list/>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import HomeHeader from "../../components/Header/HomeHeader"
    import TaskList from "../../components/Task/TaskList"

    export default {
        name: "Task",
        //实例挂载事件
        mounted(){

        },
        //组件映射
        components: {
            HomeHeader,
            TaskList
        },

        //方法
        methods: {
            ...mapActions(['getUserInfo','getGoods'])
        },

    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.task
    margin-top 45px
    overflow hidden
.rollnotice
    margin-top 5px
    padding 0 10px;
    background-color #ffffff
</style>
