<template>
    <div class="detail">
        <home-header>
            <span slot="icon-left">
                <a href="javascript:;" @click="$router.back()">
                    <i class="iconfont icon-return"></i>
                </a>
            </span>
            <span slot="title">任务详情</span>
        </home-header>

        <div class="item step">
            <yd-step :current="cuirent" current-color="#04BE02" style="padding: 20px 0" v-if="cuirent === 1 || cuirent === 2 || cuirent === 3 || cuirent === 4 || cuirent === 5">
                <yd-step-item>
                    <span slot="bottom">待提交</span>
                </yd-step-item>
                <yd-step-item>
                    <span slot="bottom">待审核</span>
                </yd-step-item>
                <yd-step-item>
                    <span slot="bottom">待收货</span>
                </yd-step-item>
                <yd-step-item>
                    <span slot="bottom">待确认</span>
                </yd-step-item>
                <yd-step-item>
                    <span slot="bottom">完成</span>
                </yd-step-item>
            </yd-step>

            <yd-step theme="2" current="1" current-color="#04BE02" style="" v-else-if="cuirent === 0 || cuirent === 10 || cuirent === 20 || cuirent === 30">
                <yd-step-item>
                    <span slot="top" v-show="cuirent === 0">任务被取消</span>
                    <span slot="top" v-show="cuirent === 10">任务被取消(返回任务中心)</span>
                    <span slot="top" v-show="cuirent === 20">未成团</span>
                    <span slot="top" v-show="cuirent === 30">任务超时</span>
                </yd-step-item>
            </yd-step>

            <div v-show="cuirent === 1 || cuirent === 2 || cuirent === 4">
                <div>
                    剩余操作时间
                    <TimeEndDown :endTime="endTime" class="ft-full"></TimeEndDown>
                </div>
            </div>
            <p>最近操作时间：<span class="ft-cheng">{{order.updateTime}}</span></p>
        </div>

        <!--订单详情-->
        <div class="item order-info">
            <div class="goods-name ft-full">{{task.pddGoodsName}}</div>
            <div class="wrap-img">
                <img :src="task.pddGoodsPicture">
            </div>
            <div class="mate">
                <a data-v-d56bd82a="" target="_blank" :href="'mqqwpa://im/chat?chat_type=wpa&amp;uin=' + us.user.userQQ + '&amp;version=1'">
                    <img data-v-d56bd82a="" src="/static/images/sqq.png" alt="">
                </a>
            </div>
            <div class="summary">
                <p class="idx">
                    任务编号： <em id="pddTaskId">{{task.pddTaskId}}</em>
                    <a href="javascript:;" class="copy copy yd-badge yd-badge-primary " data-clipboard-target="#pddTaskId" @click="copy">复制</a>
                </p>
                <p>
                    任务垫付：<em class="ft-full">{{task.pddGoodsPrice}}元</em> / 佣金：<em class="ft-full">{{task.pddTaskReward}}元</em>
                </p>
                <P>
                    购买要求:
                    <span class="ft-cheng" v-if="task.pddTaskOrderType === 1">- 有团参团无团再开 -</span>
                    <span class="ft-cheng" v-else-if="task.pddTaskOrderType === 2">- 发起拼团购买 -</span>
                    <span class="ft-cheng" v-else-if="task.pddTaskOrderType === 3">- 参与剩余时间最短的团购买 -</span>
                    <span class="ft-cheng" v-else-if="task.pddTaskOrderType === 4">- 单独购买 -</span>
                </P>
                <p>
                    商家：{{us.user.userName}}
                </p>

                <p>
                    收货要求：
                    <span class="ft-cheng" v-if="task.pddTaskDeliverType === 1">- 跟随快递签收 -</span>
                    <span class="ft-cheng" v-else-if="task.pddTaskDeliverType === 2">- 3天即可签收 -</span>
                    <span class="ft-cheng" v-else-if="task.pddTaskDeliverType === 3">- 可以立即签收-</span>
                <p>
                    评价要求：
                    <span class="ft-cheng" v-if="task.pddTaskEvaluateType === 1">- 自由评价 -</span>
                    <span class="ft-cheng" v-else-if="task.pddTaskEvaluateType === 2">- 指定文字评价 -</span>
                    <span class="ft-cheng" v-else-if="task.pddTaskEvaluateType === 3">- 指定文字图片评价（无文字只晒图）-</span>
                </p>
            </div>
        </div>

        <!--订单提示-->
        <div class="item order-hint" v-show="cuirent === 1">
            <div class="qr-code center mb-15" v-show="task.pddTaskType === 1">
                <img
                    :src="'http://bshare.optimix.asia/barCode?site=weixin&url=http://mobile.yangkeduo.com/goods2.html?goods_id='+task.pddGoodsId"
                    alt="">
                <p>长按二维码识别</p>
            </div>
            <div class="search mb-15" v-show="task.pddTaskType === 2">
                <p>店铺名称：<span class="ft-cheng">{{task.pddSellerName}}</span></p>
                <p>关键词：
                    <span class="ft-cheng" id="keyName">{{task.pddGoodsKeyName}}</span>
                    <a href="javascript:;" class="copy yd-badge yd-badge-primary " data-clipboard-target="#keyName" @click="copy">复制</a>
                </p>
            </div>
            <div class="hint mb-15">
                <ol>
                    <li>商家要求：
                        <span class="ft-full" v-if="task.pddTaskOrderType === 1">- 有团参团无团再开 -</span>
                        <span class="ft-full" v-else-if="task.pddTaskOrderType === 2">- 发起拼团购买 -</span>
                        <span class="ft-full" v-else-if="task.pddTaskOrderType === 3">- 参与剩余时间最短的团购买 -</span>
                        <span class="ft-full" v-else-if="task.pddTaskOrderType === 4">- 单独购买 -</span>

                        <span class="ft-full" v-if="task.pddTaskDeliverType === 1">- 跟随快递签收 -</span>
                        <span class="ft-full" v-else-if="task.pddTaskDeliverType === 2">- 3天即可签收 -</span>
                        <span class="ft-full" v-else-if="task.pddTaskDeliverType === 3">- 可以立即签收-</span>

                        <span class="ft-full" v-show="task.pddTaskNeedToChat === 1">-与客服假聊-</span>
                        <span class="ft-full" v-show="task.pddTaskIsRealReceived === 1">-用真实地址收货-</span>
                    </li>
                    <li v-if="task.pddTaskType === 1">1.长按上面的二维码图片，选择识别二维码 ，下单用
                        <span class="ft-full" v-if="task.pddTaskOrderType === 1">【有团参团无团再开】</span>
                        <span class="ft-full" v-else-if="task.pddTaskOrderType === 2">【发起拼团】</span>
                        <span class="ft-full" v-else-if="task.pddTaskOrderType === 3">【参与剩余时间最短团】</span>
                        <span class="ft-full" v-else-if="task.pddTaskOrderType === 4">【单独购买】</span>
                        的方式购买！
                    </li>
                    <li v-if="task.pddTaskType === 2">1.按照以上关键词搜所到指定店铺的商品 ，然后下单用
                        <span class="ft-full" v-if="task.pddTaskOrderType === 1">【有团参团无团再开】</span>
                        <span class="ft-full" v-else-if="task.pddTaskOrderType === 2">【发起拼团】</span>
                        <span class="ft-full" v-else-if="task.pddTaskOrderType === 3">【参与剩余时间最短团】</span>
                        <span class="ft-full" v-else-if="task.pddTaskOrderType === 4">【单独购买】</span>
                        的方式购买！
                    </li>
                    <li>2.成功付款后，填写下面的拼多多订单号 ， 以及收货人姓名 <p class="ft-cheng center">（**提示:如何获取拼多多订单号，请查看首页买手帮助**）</p></li>
                    <li>3.如果没在规定时间内提交订单编号，此任务将作废！</li>
                    <li>4.如果搜索不到产品，可自行联系商家QQ
                        <a target="_blank" :href="'mqqwpa://im/chat?chat_type=wpa&amp;uin=' + us.user.userQQ + '&amp;version=1'">
                            <img data-v-d56bd82a="" src="/static/images/sqq.png" alt="">
                        </a>
                    </li>
                </ol>
            </div>
        </div>

        <!-- 已下单提交 -->
        <div class="item order-pddorder"  v-if="cuirent === 1 || cuirent === 2 || cuirent === 3">
            <form @submit.prevent="setOrder" v-if="cuirent === 1">
                <section class="pddorder-section">
                    <input type="text" maxlength="22" placeholder="订单编号" v-model="pddOrderNumber">
                </section>
                <section class="pddorder-section">
                    <input type="text" maxlength="6" placeholder="收货人姓名" v-model="pddOrderConsignee">
                </section>
                <section>
                    {{msg}}
                </section>
                <button class="pddorder-submit">确认提交</button>
            </form>

            <form @submit.prevent="updateOrder" v-if="cuirent === 2">
                <section class="pddorder-section">
                    <input type="text" maxlength="22" placeholder="订单编号" v-model="pddOrderNumber">
                </section>
                <section class="pddorder-section">
                    <input type="text" maxlength="6" placeholder="收货人姓名" v-model="pddOrderConsignee">
                </section>
                <button class="pddorder-submit">修改订单信息</button>
            </form>

            <form @submit.prevent="signOrderMsg" v-show="cuirent === 3">
                <button class="pddorder-submit" style="margin-top: 0">确认收货</button>
            </form>

            <div class="pddorder-cancel" v-show="cuirent === 1">
                <yd-button type="danger" @click.native="cancelOrderMsg()">放弃此任务</yd-button>
                <yd-button type="primary" @click.native="taskError()">任务信息有误</yd-button>
                <yd-button type="warning" @click.native="goodsOut()">任务商品下架</yd-button>
            </div>
        </div>

        <!--评论内容-->
        <div class="item order-comment">
            <p v-show="task.pddTaskEvaluateType === 1"> 商家要求：无需评价</p>
            <p v-show="task.pddTaskEvaluateType === 2"> 商家要求：自由评价</p>
            <p v-show="task.pddTaskEvaluateType === 3">
                商家要求：指定评价
                <a v-show="task.pddTaskEvaluateText" href="javascript:;" class="copy copy yd-badge yd-badge-primary" style="margin: 0 auto" data-clipboard-target="#evaluate" @click="copy">复制以下评价文字</a>
            </p>
            <div class="text" id="evaluate" v-show="task.pddTaskEvaluateText">{{task.pddTaskEvaluateText}}</div>

            <yd-lightbox>
                <yd-lightbox-img v-for="(item, key) in commentImgs" :key="key" :src="item.imgUrl"></yd-lightbox-img>
            </yd-lightbox>
            <div class="ft-full" style="text-align: center; line-height: 40px">文字请点击按钮复制，图片请长按保存到相册！</div>
        </div>

        <!--订单操作记录-->
        <DetailOrderRecord>
            <tr v-for="(record, key) in orecord" :key="key">
                <td height="30" width="100" align="center">{{record.author}}</td>
                <td height="30" align="center">{{record.content}}</td>
                <td height="30" width="80" align="center">{{record.createTime}}</td>
            </tr>
        </DetailOrderRecord>
    </div>
</template>

<script>
    import HomeHeader from "../../../components/Header/HomeHeader"
    import DetailOrderRecord from "../../../components/Detail/DetailOrderRecord"
    import {reqOrderDetail,reqPddOrderMsg,reqUpdatePddOrderMsg,reqSignOrder,reqCancelOrder} from "../../../api"
    //引入复制组件
    import Clipboard from 'clipboard'
    //引入倒计时组件
    import TimeEndDown from '../../../components/EndTime/EndTime'

    export default {
        //组件映射
        components: {
            HomeHeader,
            TimeEndDown,
            DetailOrderRecord
        },
        inject: ['reload'],
        name: "Detail",
        data() {
            return {
                //获取指定的PddId
                orderId: this.$route.params.id,
                //指定的数据
                task: {},
                order: {},
                us: {
                    user: {}
                },
                ub: {
                    user: {}
                },
                orecord:[],
                commentImgs:[],

                //当前显示状态
                cuirent: null,

                //倒计时
                time:'',
                endTime: '',
                endTimeFlag: false,

                //指定表单数据
                pddOrderNumber: '',
                pddOrderConsignee: '',
                inputFlag: false
            }
        },
        //计算属性
        computed:{
            msg(){

            }
        },
        // 自动加载
        mounted() {
            //发起任务详情请求
            this.getOrderDetail(this.orderId)
        },
        // 方法
        methods: {
            //异步获取订单详情
            async getOrderDetail(orderId) {
                // 发送ajax请求
                this.$dialog.loading.open('获取任务详情中...')
                const result = await reqOrderDetail(orderId)
                this.$dialog.loading.close()
                if (result.code === 0) {
                    //主数据赋值
                    this.task = result.data.task //设置任务数据
                    this.order = result.data.order //设置订单数据
                    this.us = result.data.us //设置商家数据
                    this.ub = result.data.ub //设置买手数据
                    this.orecord = result.data.orecord //获取订单记录数据 数组
                    //设置当前订单状态
                    this.cuirent = result.data.order.status //设置订单状态
                    this.endTime = result.data.order.outTime //设置当前状态过期时间
                    this.commentImgs = result.data.task.commentImgs //设置评价图片

                    //判断任务状态
                    if (result.data.order.status === 1) {
                        //状态：已接单、待收货
                        this.endTimeFlag = true
                    }else if (result.data.order.status === 2){
                        //状态，已下单，待商家审核
                        this.endTimeFlag = true
                        this.pddOrderNumber = result.data.task.pddOrderId
                        this.pddOrderConsignee = result.data.task.pddTaskAddressee
                    }else if (result.data.order.status === 3){
                        //状态，已审核成团，待收货
                    }else if (result.data.order.status === 4){
                        //状态，已收货，待商家确认
                        this.endTimeFlag = true
                    }else if (result.data.order.status === 5){
                        //状态，完成
                    }else if (result.data.order.status === 10){
                        //状态，任务取消（返回任务大厅）
                    }else if (result.data.order.status === 20){
                        //状态，未成团
                    }else if (result.data.order.status === 30){
                        //状态，其他
                    }
                }

            },

            // 1、异步提交Pdd订单信息
            async setOrder() {
                if (this.endTimeFlag){
                    // 验证订单信息
                    const {pddOrderNumber,pddOrderConsignee,orderId} = this
                    if (!/^[1]{1}[0-9]{5}\-{1}[0-9]{15}$/.test(pddOrderNumber)) {
                        this.$dialog.toast({ mes: '订单号规则有误！',timeout: 1500,})
                        return false
                    }
                    if (!pddOrderConsignee) {
                        this.$dialog.toast({mes: '收货人姓名不能为空!',timeout: 1500,})
                        return false
                    }
                    // 发送ajax请求
                    this.$dialog.loading.open('提交中...')
                    const result = await reqPddOrderMsg(pddOrderNumber,pddOrderConsignee,orderId)
                    this.$dialog.loading.close();
                    // 判断返回成功
                    if (result.code === 0){
                        this.$dialog.toast({ mes: result.msg, timeout: 1500,icon: 'success' })
                        setTimeout(() => {this.reload()},1500)
                    }
                } else {
                    this.$dialog.toast({mes: '订单已超时！无法提交',timeout: 1500,})
                    return
                }
            },



            // 2、异步更新订单信息
            async updateOrder(){
                // 验证订单信息
                const {pddOrderNumber,pddOrderConsignee,orderId} = this
                if (!/^[1]{1}[0-9]{5}\-{1}[0-9]{15}$/.test(pddOrderNumber)) {
                    this.$dialog.toast({ mes: '订单号规则有误！',timeout: 1500,})
                    return false
                }
                if (!pddOrderConsignee) {
                    this.$dialog.toast({mes: '收货人姓名不能为空!',timeout: 1500,})
                    return false
                }
                // 发送ajax请求
                this.$dialog.loading.open('提交中...')
                const result = await reqUpdatePddOrderMsg(pddOrderNumber,pddOrderConsignee,orderId)
                this.$dialog.loading.close()
                // 判断返回成功
                if (result.code === 0){
                    this.$dialog.toast({mes: result.msg, timeout: 1500,icon: 'success'})
                    setTimeout(() => {this.reload()},1500)
                }
            },

            // 收货提示
            signOrderMsg() {
                this.$dialog.confirm({
                    title: '提示',
                    mes: '请检查好已在拼多多收货，如提前收货，商家投诉将无法获取本次佣金！',
                    opts: () => {
                        this.signOrder()
                    }
                });
            },

            // 3、异步确认收货
            async signOrder(){
                // 发送ajax请求
                this.$dialog.loading.open('提交中...')
                const {orderId} = this
                const result = await reqSignOrder(orderId)
                this.$dialog.loading.close()
                // 判断返回成功
                if (result.code === 0){
                    this.$dialog.toast({mes: result.msg, timeout: 1500,icon: 'success'})
                    setTimeout(() => {this.reload()},1500)
                }
            },

            // 放弃任务提示
            cancelOrderMsg() {
                this.$dialog.confirm({
                    title: '提示',
                    mes: '任务放弃后将返回任务大厅，同时在指定天数内部能再接此商家任务！',
                    opts: () => {
                        this.cancelOrder()
                    }
                });
            },
            //放弃任务
            async cancelOrder(){
                if (this.endTimeFlag){
                    // 发送ajax请求
                    this.$dialog.loading.open('提交中...')
                    const {orderId} = this
                    const result = await reqCancelOrder(orderId)
                    this.$dialog.loading.close()
                    // 判断返回成功
                    if (result.code === 0 ){
                        this.$dialog.toast({mes: result.msg, timeout: 1500,icon: 'success'})
                        setTimeout(() => {this.reload()},1500)
                    }
                } else {
                    this.$dialog.toast({
                        mes: '任务取消失败',
                        timeout: 1500,
                    });
                }
            },

            //任务信息有误
            taskError(){
                if (this.endTimeFlag){

                } else {
                    this.$dialog.toast({
                        mes: '任务投诉失败',
                        timeout: 1500,
                    });
                }
            },

            //商品下架
            goodsOut(){
                if (this.endTimeFlag){

                } else {
                    this.$dialog.toast({
                        mes: '任务投诉失败',
                        timeout: 1500,
                    });
                }
            },

            //复制指定内容方法
            copy(){
                //点击复制到剪切板
                const clipboard = new Clipboard('.copy')
                clipboard.on('success', e => {
                    this.$dialog.toast({
                        mes: e.text + ' 已复制到剪切板！',
                        timeout: 1500,
                    });
                })
            },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .disabled
        background-color #ccc
        color #f0f0f0;
        pointer-events none
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
    .detail
        margin-top 45px
        overflow hidden

    .item
        background #ffffff
        margin-bottom 10px
        padding 10px 5px

    .step
        text-align center
        p
            line-height 25px

    .order-info
        position relative
        padding 10px
        min-height 130px
        color #6e6e6e
        .goods-name
            width 100%
            padding 0 10px
            height 25px
            text-overflow ellipsis
            overflow hidden
            white-space nowrap
        .wrap-img
            width 80px
            height 80px
            position absolute
            left 20px
            top 40px
            img
                width 100%
                height 100%
        .mate
            position absolute
            left 20px
            top 130px
        .summary
            margin-left 110px
            P
                line-height 23px
    .order-hint
        padding 10px 20px
        .qr-code
            p
                line-height 25px
                font-weight 700
                font-size 14px
                color #ff5722
        .search
            p
                line-height 30px
        ol
            li
                line-height 25px
    .order-pddorder
        padding 10px 20px
        .pddorder-section
            position relative
            margin-top 15px
            height 48px
            font-size 14px
            background #fff
        .pddorder-submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #ff5722
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
                border #ff5722 1px solid
        .pddorder-cancel
            padding 20px 0
            display flex
            display -webkit-flex
            justify-content space-between

    .order-comment
        padding 10px 20px
        p
            font-size 14px
            line-height 30px
            padding-bottom 10px
        .text
            text-align center
            line-height 30px
            padding 10px 0
            margin-bottom 10px
            border-radius 10px
            background-color #f1f1f1
        img
            max-width 100%
            padding 5px

</style>
