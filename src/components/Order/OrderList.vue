<template>
    <div class="order-box">
        <div class="order-bar">
            <ul class="bar-list">
                <li class="bar-item" @click="statusCategory('all')">
                    <i class="iconfont icon-createtask_fill"></i>
                    <span>全部</span>
                    <yd-badge type="hollow" scale="0.8" class="count">{{statusCount.all}}</yd-badge>
                </li>
                <li class="bar-item" @click="statusCategory('going')">
                    <i class="iconfont icon-createtask_fill"></i>
                    <span>进行中</span>
                    <yd-badge type="primary" scale="0.8" class="count">{{statusCount.going}}</yd-badge>
                </li>
                <li class="bar-item" @click="statusCategory(1)">
                    <i class="iconfont icon-task_fill"></i>
                    <span>待提交</span>
                    <yd-badge type="danger" scale="0.8" class="count">{{statusCount.submit}}</yd-badge>
                </li>
                <li class="bar-item" @click="statusCategory(2)">
                    <i class="iconfont icon-createtask_fill"></i>
                    <span>待发货</span>
                    <yd-badge type="warning" scale="0.8" class="count">{{statusCount.deliver}}</yd-badge>
                </li>
                <li class="bar-item" @click="statusCategory(3)">
                    <i class="iconfont icon-marketing_fill"></i>
                    <span>待收货</span>
                    <yd-badge type="danger" scale="0.8" class="count">{{statusCount.receipt}}</yd-badge>
                </li>
                <li class="bar-item" @click="statusCategory(4)">
                    <i class="iconfont icon-flag_fill"></i>
                    <span>待确认</span>
                    <yd-badge type="warning" scale="0.8" class="count">{{statusCount.affirm}}</yd-badge>
                </li>
                <li class="bar-item" @click="statusCategory(5)">
                    <i class="iconfont icon-success_fill"></i>
                    <span>已完成</span>
                    <yd-badge type="primary" scale="0.8" class="count">{{statusCount.done}}</yd-badge>
                </li>
                <li class="bar-item" @click="statusCategory(10)">
                    <i class="iconfont icon-feedback_fill"></i>
                    <span>已取消</span>
                    <yd-badge scale="0.8" class="count">{{statusCount.cancel}}</yd-badge>
                </li>
                <li class="bar-item">
                    <i class="iconfont icon-delete_fill"></i>
                    <span>未成团</span>
                </li>
                <li class="bar-item">
                    <i class="iconfont icon-feedback_fill"></i>
                    <span>投诉中</span>
                </li>
            </ul>
        </div>
        <yd-infinitescroll :callback="loadList" ref="infinitescrollOrderList">
            <yd-list slot="list"  class="order-list">
                <div class="not-task" v-if="taskList.length < 1">暂无任务！</div>
                <li class="order-flow" v-for="(order , key) in taskList" :key="key">
                    <span class="wrap-img" style="width: 80px; height: 80px;">
                        <img :src="order.task.pddGoodsPicture">
                    </span>
                    <div class="mate">
                        <a target="_blank" :href="'mqqwpa://im/chat?chat_type=wpa&amp;uin='+order.us.user.userQQ+'&amp;version=1'"><img src="/static/images/sqq.png" alt=""></a>
                    </div>
                    <a  class="content" @click="goToDetail(order.oId)">
                        <div class="summary">
                            <p class="idx">
                                任务编号： <em>{{order.task.pddTaskId}}</em>
                            </p>
                            <P>
                                <span>
                                    任务状态：
                                    <em v-if="order.status === 1">【待提交】</em>
                                    <em v-if="order.status === 2">【已提交】待商家发货</em>
                                    <em v-if="order.status === 3">【已发货】待签收</em>
                                    <em v-if="order.status === 4">【已签收】待商家确认</em>
                                    <em v-if="order.status === 5">【任务完成】</em>
                                    <em v-if="order.status === 10">- 已作废 -</em>
                                </span>
                            </P>
                            <p>
                            商家账号：{{order.us.user.userName}}
                            </p>
                            <p>
                                <span>垫付：<em class="green">{{order.task.pddGoodsPrice}}</em></span>
                                <span style="margin-left: 15px">佣金：<em>{{order.task.pddTaskReward}}元</em></span>
                            </p>
                            <p class="time">
                                更新时间：{{order.updateTime}}
                            </p>
                        </div>
                    </a>
                </li>
            </yd-list>
            <span slot="doneTip">没有任务啦~~</span>
            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
        </yd-infinitescroll>
    </div>
</template>

<script>
    import {reqMyOrderList,reqMyOrderCounts} from "../../api"
    export default {
        name: "OrderList",
        //页面数据
        data(){
            return {
                //列表数据
                limit: 10,
                page: 1,
                //筛选条件
                status: 'all',
                sort:'',
                search:'',

                //页面数据
                pageSize: '',
                taskList: [],
                //状态分类总数
                statusCount: {}
            }
        },

        //初始化执行
        mounted(){
            this.getMyOrderList()
            this.getMyOrderCounts()
        },

        //方法
        methods:{
            //异步获取订单总数
            async getMyOrderCounts (){
                const result = await reqMyOrderCounts()
                if ( result.code === 0 ){
                    this.statusCount = result.data
                }
            },
            //异步获取任务订单列表
            async getMyOrderList (){
                // 发送ajax请求
                this.$dialog.loading.open('任务列表加载中...')
                const result = await reqMyOrderList(this.limit,this.page,this.status)
                this.$dialog.loading.close();
                // 返回成功处理
                if ( result.code === 0 ){
                    this.taskList = result.data
                    this.pageSize = result.pageSize
                    //this.$store.dispatch('recordTaskList',taskList)
                    if (this.page === this.pageSize){
                        //所有加载完成
                        this.$refs.infinitescrollOrderList.$emit('ydui.infinitescroll.loadedDone')
                    }
                }
            },

            //滚动加载
            async loadList() {
                this.page++;
                const result = await reqMyOrderList(this.limit,this.page,this.status)
                if (result.code === 0){
                    //新获取输入加入到原始数据中
                    this.taskList = this.taskList.concat(result.data)
                    //判断是否全部数据都加载完了
                    if (this.page === this.pageSize){
                        //所有加载完成
                        this.$refs.infinitescrollOrderList.$emit('ydui.infinitescroll.loadedDone')
                        return
                    }
                    //单次加载完成
                    this.$refs.infinitescrollOrderList.$emit('ydui.infinitescroll.finishLoad')
                    // //写入VUEX
                    // this.$store.dispatch('recordTaskList',taskList)
                }
            },

            //状态分类
            statusCategory(status){
                this.status = status
                this.page = 1
                this.taskList = []
                this.pageSize = ''
                this.$refs.infinitescrollOrderList.$emit('ydui.infinitescroll.reInit')
                this.getMyOrderList()
            },

            //进入订单详情 并传递订单Id
            goToDetail(orderId){
                this.$router.push({ name: 'Detail', params: {id: orderId}})
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"
.not-task
    text-align center
    font-size 16px
    line-height 50px
.order-box
    margin-top 5px
.order-bar
    padding 8px 0
    background-color #ffffff
    .bar-list
        display flex
        flex-wrap wrap
        align-content: flex-start
        align-items center
        .bar-item
            width 20%
            padding 15px 5px
            display flex
            flex-direction column
            text-align center
            overflow hidden
            position relative
            color #999999
            padding-top 2px
            span
                margin-top 5px
            .count
                display block
                position absolute
                top -5px
                left 50%
                margin-left 5px
                font-size 12px
                z-index 99
    .iconfont
        font-size 30px

.order-list
    margin-top 8px
    background-color #ffffff
    .order-flow
        bottom-border-1px(#e4e4e4)
        width 100%
        word-wrap break-word
        padding 15px 15px
        min-height 140px
        .wrap-img
            position absolute
            left 15px
            top 15px
        .mate
            position absolute
            lrft 0
            top 105px
        .content
            margin-top -10px
            padding-left 95px
            display block
        .summary
            margin-top -15px
            min-height 90px
            em.green
                color #4cd96f
            em
                color #FF5722
            p
                margin-top 6px;
                color #666
            span
                color #666
            .time
                color #a5a5a5

.wrap-img
    img
        width 100%
        height 100%
        border-radius 3px
</style>
