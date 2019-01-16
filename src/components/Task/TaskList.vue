<template>
    <yd-infinitescroll :callback="loadList" ref="infinitescrollTaskList" >
        <yd-list slot="list" class="task-list">
            <div class="not-task" v-if="taskList.length < 1">暂无任务！</div>
            <li class="task-flow" v-for="(task,key) in taskList" :key="key" >
                <div href="" class="content">
                    <div class="wrap-img" style="width: 80px; height: 80px;">
                        <img :src="task.pddGoodsPicture">
                    </div>
                    <div class="summary">
                        <p class="aux">
                            <yd-badge shape="square" type="primary" v-if="task.pddTaskType === 1">扫码</yd-badge>
                            <yd-badge shape="square" type="danger" v-else>搜索</yd-badge>

                            <yd-badge shape="square" type="primary" v-if="task.pddTaskEvaluateType === 1">自由评价</yd-badge>
                            <yd-badge shape="square" type="warning" v-else-if="task.pddTaskEvaluateType === 2">指定评价</yd-badge>
                            <yd-badge shape="square" type="danger" v-else-if="task.pddTaskEvaluateType === 3">字图评价</yd-badge>
                            <yd-badge shape="square" v-else>无需评价</yd-badge>

                            <yd-badge shape="square" type="warning" v-show="task.pddTaskIsVipBuyer === 1">信誉</yd-badge>
                        </p>
                        <div>
                        </div>
                        <span class="em">
                            垫付资金：<em>￥{{task.pddGoodsPrice}}</em>元 / 佣金 <em>￥{{task.pddTaskReward}}</em>元
                        </span>

                        <p style="padding: 3px 0;" class="em" >
                            <span class="ft-full" v-if="task.pddTaskOrderType === 1">
                                【有团参团,无团开团】
                            </span>
                            <span class="ft-full" v-if="task.pddTaskOrderType === 2">
                                【开新团购买】
                            </span>
                            <span class="ft-full" v-if="task.pddTaskOrderType === 3">
                                【参团购买】
                            </span>
                            <span class="ft-full" v-if="task.pddTaskOrderType === 4">
                                【单独购买】
                            </span>
                        </p>
                        <span class="em">
                            是否假聊
                            <em v-if="task.pddTaskNeedToChat === 1">是</em>
                            <em v-else>否</em>
                        </span>
                        <div class="btn">
                            <yd-button type="danger" size="small" @click.native="takeTask(task.pddTaskId)">抢单</yd-button>
                        </div>
                    </div>
                </div>
            </li>
        </yd-list>
        <span slot="doneTip">没有任务啦~~</span>
        <!-- 加载中提示，不指定，将显示默认加载中图标 -->
        <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
    </yd-infinitescroll>
</template>

<script>
    import {reqTaskList,reqSendTakeTask} from "../../api"
    export default {
        name: 'TaskList',
        data(){
            return {
                //任务
                limit:8,
                page:1,
                pageSize:'',
                taskList:[],
                //提示信息内容
                msgAlertCenter: "<div class=\"layui-m-layercont\"><p>请买手务必遵守以下几条规定：</p><p style=\"color:red;text-align: left\">1、时刻保持QQ在线，手机号码必须保持畅通，方便联系。</p><p style=\"color:red;text-align: left\">2、请严格按照商家发布的参团（去拼单）或者开团（发起拼单）要求下单。</p><p style=\"color:red;text-align: left\">3、不能用任何优惠券和任何返利网。</p><p style=\"color:red;text-align: left\">4、不能投诉物流。</p><p style=\"color:red;text-align: left\">5、不能申请退款。</p><p style=\"color:red;text-align: left\">6、不能在拼多多上找商家客服（只能联系商家QQ）。</p><p style=\"color:red;text-align: left\">7、刷手不得自己主动点免拼。</p><p style=\"color:red;text-align: left\">8、请在拼多多APP--个人中心--设置--免拼卡设置--开启自动使用免拼卡。</p><p style=\"text-align: left\">以上8条有违反者平台系统检测到或接到投诉【轻微无意者将扣除账号可接单数量或对应佣金】，【严重者直接封号处理】！有任何问题请及时联系平台QQ，我们看到会第一时间进行处理。</p></div>",
                //任务被选中
                //taskChecked: '',

            }
        },
        //初始化执行
        mounted(){
            this.getTaskList(this.limit,this.page)
        },
        //计算属性
        computed:{

        },

        //方法
        methods:{
            //异步获取任务中心列表
            async getTaskList (limit, page){
                this.$dialog.loading.open('任务列表加载中...');
                const result = await reqTaskList(limit, page)
                if (result.code === 0){
                    const req = result.data
                    this.taskList = req
                    this.pageSize = result.pageSize
                    //this.$store.dispatch('recordTaskList',taskList)
                    //单次加载完成
                    if (this.page === this.pageSize){
                        //所有加载完成
                        this.$refs.infinitescrollTaskList.$emit('ydui.infinitescroll.loadedDone')
                    }

                }
                this.$dialog.loading.close();
            },
            //滚动加载
            async loadList() {
                this.page++;
                const result = await reqTaskList(this.limit,this.page)

                if (result.code === 0){
                    const _req = result.data
                    //新获取输入加入到原始数据中
                    this.taskList = this.taskList.concat(_req)
                    //判断是否全部数据都加载完了
                    if (this.page === this.pageSize){
                        //所有加载完成
                        this.$refs.infinitescrollTaskList.$emit('ydui.infinitescroll.loadedDone')
                        return
                    }
                    //单次加载完成
                    this.$refs.infinitescrollTaskList.$emit('ydui.infinitescroll.finishLoad')
                    // //写入VUEX
                    // this.$store.dispatch('recordTaskList',taskList)
                }
            },

            //接单 提示
            takeTask(pddTaskId) {
                this.$dialog.confirm({
                    title: '买手接单必须读！',
                    mes: this.msgAlertCenter,
                    opts: () => {
                        this.sendTakeTask(pddTaskId)
                    }
                });
            },

            //接单异步请求
            async sendTakeTask(pddTaskId){
                this.$dialog.loading.open('接单处理中..');
                const result = await reqSendTakeTask(pddTaskId)
                const orderId = result.orderId
                this.$dialog.loading.close();
                if (result.code === 0){
                    //提示接单成功！
                    this.$dialog.toast({
                        mes: result.msg,
                        timeout: 1500,
                        icon: 'success'
                    })
                    //等待2秒 跳转到详情页面
                    setTimeout(() => {
                        this.$router.push({ name: 'Detail', params: {id: orderId}})
                    }, 1500);
                }else {
                    this.$dialog.loading.close();
                    this.$dialog.toast({
                        mes: result.msg,
                        timeout: 1500,
                        icon: 'error'
                    })
                }
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
.mb-15
    margin-bottom 15px
.center
    text-align center
.ft-cheng
    color: #ff5722
.ft-full
    color #ff5722
    font-size 14px
    font-weight 600
.yd-list
    min-height 100%
.task-list
    margin-top 5px
    position relative
    min-height 100%
    width 100%
    background-color #ffffff
.task-flow
    bottom-border-1px(#f0f0f0)
    display flex
    margin-top 6px
    padding 15px 18px
    word-wrap break-word
    .content
        display block
        width 100%
        padding-left 95px
    .cur
        background #b8b8b8
    .wrap-img
        position absolute
        top 50%
        left 15px
        margin-top -40px
        img
            width 100%
            height 100%
            border-radius 5px
    .summary
        min-height 80px
        overflow hidden
        .em
            display block
            margin-top 3px
            color #666
            em
                color #ff0000
        .aux
            margin-bottom 5px
            span
                display inline-block
        .btn
            position absolute
            right 15px
            bottom 15px
            text-align right

</style>
