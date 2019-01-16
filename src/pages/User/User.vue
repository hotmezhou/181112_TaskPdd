<template>
    <section class="user">
        <home-header>
            <span slot="icon-left">
                <a href="javascript:;" @click="$router.back()">
                    <i class="iconfont icon-return"></i>
                </a>
            </span>
            <span slot="title">个人中心</span>
        </home-header>
        <section class="user-number">
            <a href="javascript:;" class="content">
                <span class="user-img" style="width: 90px; height: 90px;">
                    <img src="./images/tou2.png" alt="head-img">
                </span>
                <span class="user-guide">
                    <i class="iconfont icon-enter"></i>
                </span>
                <div class="user-info">
                    <h6>{{userInfo.userName || ''}}</h6>
                    <p><span>绑定手机：{{userInfo.userPhone || ''}}</span></p>
                    <p><span>QQ：{{userInfo.userQQ || ''}}</span></p>
                    <div class="badge">
                        <yd-badge type="warning" v-if="buyerAccountInfo.isTrust === 1">信誉买手</yd-badge>
                        <yd-badge v-else>非信誉买手</yd-badge>
                        <yd-badge type="primary" v-if="buyerAccountInfo.isValid === 1">已实名认证</yd-badge>
                        <yd-badge v-else-if="buyerAccountInfo.isValid === 2">实名审核中...</yd-badge>
                        <yd-badge v-else-if="buyerAccountInfo.isValid === 3">实名审核失败</yd-badge>
                    </div>
                </div>
            </a>
            <ul class="info-data-list">
                <li>
                    <p><span><em>{{buyerAccountInfo.balance}}</em> 元</span></p>
                    <p><span><i class="iconfont icon-financial_fill"></i>当前账户余额</span></p>
                </li>
                <li>
                    <p><em>{{buyerAccountInfo.orderCount}}</em> 单</p>
                    <p><span><i class="iconfont icon-task_fill"></i>已接任务总量</span></p>
                </li>
                <li>
                    <p><em>0</em> 元</p>
                    <p><span><i class="iconfont icon-redpacket"></i>已赚红包总数</span></p>
                </li>
            </ul>
        </section>
        <section style="margin-top: 10px;">
            <div class="cell-box">
                <div class="cell">
                    <a @click="goToAuth('/auth')" class="cell-item">
                        <div class="cell-left">
                            <span class="cell-icon"></span>
                            <span>实名认证</span>
                        </div>
                        <div class="cell-right cell-arrow">
                            <span v-if="buyerAccountInfo.isValid === 1">已认证</span>
                            <span v-else-if="buyerAccountInfo.isValid === 2">实名认证审核中...</span>
                            <span v-else-if="buyerAccountInfo.isValid === 3">实名认证失败，请重新申请！</span>
                            <span v-else>您还未实名认证，认证后才可以接单哦！</span>
                        </div>
                    </a>
                </div>
                <div class="cell">
                    <a @click="goToInvite('/invite')" class="cell-item">
                        <div class="cell-left">
                            <span class="cell-icon"></span>
                            <span>我的邀请</span>
                        </div>
                        <div class="cell-right cell-arrow">
                            <span>邀请新用户分润高达80%</span>
                        </div>
                    </a>
                </div>
            </div>
        </section>

        <section style="margin-top: 10px;">
            <div class="cell-box">
                <div class="cell">
                    <a @click="goTo('/order')" class="cell-item">
                        <div class="cell-left">
                            <span class="cell-icon"></span>
                            <span>已接任务</span>
                        </div>
                        <div class="cell-right cell-arrow">
                            <span>当前已接任务{{buyerAccountInfo.orderCount}}单</span>
                        </div>
                    </a>
                </div>
                <div class="cell">
                    <a @click="goTo('/record')" class="cell-item">
                        <div class="cell-left">
                            <span class="cell-icon"></span>
                            <span>我的资金记录</span>
                        </div>
                        <div class="cell-right cell-arrow">
                        </div>
                    </a>
                </div>
                <div class="cell">
                    <a @click="goTo('/recharge')" class="cell-item">
                        <div class="cell-left">
                            <span class="cell-icon"></span>
                            <span>账户充值</span>
                        </div>
                        <div class="cell-right cell-arrow">
                        </div>
                    </a>
                </div>
                <div class="cell">
                    <a @click="goToCash('/cash')" class="cell-item">
                        <div class="cell-left">
                            <span class="cell-icon"></span>
                            <span>账户提现</span>
                        </div>
                        <div class="cell-right cell-arrow">
                            <span>当前余额{{buyerAccountInfo.balance}}元</span>
                        </div>
                    </a>
                </div>
                <!--<div class="cell">-->
                    <!--<a @click="goTo('/order')" class="cell-item">-->
                        <!--<div class="cell-left">-->
                            <!--<span class="cell-icon"></span>-->
                            <!--<span>投诉管理</span>-->
                        <!--</div>-->
                        <!--<div class="cell-right cell-arrow">-->
                        <!--</div>-->
                    <!--</a>-->
                <!--</div>-->
                <div class="cell">
                    <a target="_blank" :href="'mqqwpa://im/chat?chat_type=wpa&amp;uin=1393882232&amp;version=1'"  class="cell-item">
                        <div class="cell-left">
                            <span class="cell-icon"></span>
                            <span>联系客服</span>
                        </div>
                        <div class="cell-right cell-arrow">
                                <img src="/static/images/kqq.png">
                        </div>
                    </a>
                </div>
                <!--<div class="cell">-->
                    <!--<a @click="" class="cell-item">-->
                        <!--<div class="cell-left">-->
                            <!--<span class="cell-icon"></span>-->
                            <!--<span>开通信誉买手</span>-->
                        <!--</div>-->
                        <!--<div class="cell-right cell-arrow">-->
                        <!--</div>-->
                    <!--</a>-->
                <!--</div>-->
            </div>
        </section>
        <section>
            <button @click="logout" class="out-log">退出登录</button>
        </section>
    </section>
</template>

<script>
    import AlertTip from '../../components/AlertTip/AlertTip'
    import {mapState} from 'vuex'
    import HomeHeader from "../../components/Header/HomeHeader"
    import {reqMyBuyerAccount} from "../../api"
    export default {
        name: "User",
        data(){
            return{
                utoken:window.localStorage.getItem('utoken'),
                alertText: '', //提示文本
                alertShow: false, //是否显示提示框

                // 买手账户相关资料
                buyerAccountInfo: {}
            }
        },
        computed:{
            ...mapState(['userInfo','userToken'])
        },

        mounted(){
            this.getMyBuyerAccount()
        },

        methods:{
            //链接跳转方法
            goTo(path) {
                this.$router.replace(path)
            },
            //进入提现需验证用户是否实名
            goToCash(path){
                if (this.buyerAccountInfo.isValid !== 1){
                    this.$dialog.alert({mes: '您的账户未实名，或未认证成功！'})
                    return
                }
                this.$router.replace(path)
            },
            goToInvite(path){
                this.$dialog.alert({mes:'邀请红包活动暂未开始！请关注官方公告！'})
            },
            goToAuth(path){
                if (this.buyerAccountInfo.isValid !== 1){
                    this.$dialog.alert({mes: '实名认证请前往电脑端处理！'})
                    if (this.buyerAccountInfo.isValid === 2){
                        this.$dialog.alert({mes: '实名审核中...'})
                    }
                    return
                }
            },
            //异步获取买手账户相关资料
            async getMyBuyerAccount(){
                this.$dialog.loading.open('用户资料获取中...')
                const result = await reqMyBuyerAccount()
                this.$dialog.loading.close()
                // 判断返回成功
                if (result.code === 0){
                    this.buyerAccountInfo = result.data
                }
            },
            //异步登出
            logout(){
                this.$dialog.confirm({
                    title: '退出登录',
                    mes: '您确认好退出？',
                    opts: () => {
                        this.$store.dispatch('logout')
                        this.$router.replace('/login')
                    }
                })
            },
            showAlert(alertText){
                this.alertText = alertText
                this.alertShow = true
            },
            closeTip(){
                this.alertText = ''
                this.alertShow = false
            },
        },
        components: {
            HomeHeader,
            AlertTip
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.user
    padding-top 45px
    overflow hidden
.user-number
    color: #fff
    position relative
    width 100%
    min-height 180px
    //background url("./images/user-bg.jpg") no-repeat center center
    background-color #ff743a
    background-size cover
    .user-img
        position absolute
        top 20px
        left 20px
        img
            border: solid 3px #FD9B81;
            width 100%
            height 100%
            border-radius 50%
    .user-guide
        position absolute
        right 20px
        top 60px
        margin-top -10px
        .iconfont
            font-size 30px
    .content
        display block
        .user-info
            width 100%
            padding-left 130px
            padding-top 20px
            h6
                font-size 18px
                margin-bottom 3px
            p
                padding 2px 0
            .badge
                padding 5px 0
    .info-data-list
        width 100%
        display flex
        position absolute
        bottom 0
        flex-wrap wrap
        align-content: flex-start //内容排列模式
        align-items center
        background-color rgba(255,255,255,0.2)
        .iconfont
            font-size 18px
        li
            position relative
            text-align center //内容剧中
            display flex //flex布局显示
            flex-direction column //flex布局换行剧中对齐
            width 33.3%
            padding 10px 5px
            overflow hidden
            em
                font-size 16px
                font-weight 700
            span
                margin-top 3px
            &:after
                height 30px
                width 1px
                position absolute
                top 50%
                right 0
                content: ''
                margin-top -15px
                background rgba(255,255,255,0.5)
        li:last-child
            &:after
                background none
                border non
    a
        color #fff
.cell-box
    margin-bottom 10px
    .cell
        position relative
        z-index 5
        background-color #fff
        .cell-item:after
            height 1px
            position absolute
            z-index 0
            bottom 0
            left 0
            content ""
            width 100%
            background linear-gradient(0deg,#ececec 60%,transparent 0)
        .cell-item
            display flex
            display -webkit-box
            display -ms-flexbox
            position relative
            padding-left 12px
            overflow hidden
            .cell-left,.cell-right
                display -webkit-box
                display -ms-flexbox
                display flex
                -webkit-box-align center
                -ms-flex-align center
                align-items center
            .cell-left
                color #555
                font-size 14.000000000000002px
                white-space normal
                .cell-icon
                    display block
                    margin-left 5px
            .cell-right
                -webkit-box-flex 1
                -ms-flex 1
                flex 1
                flex-grow 1
                flex-shrink 1
                flex-basis 0%
                width 100%
                min-height 50px
                color #969696
                text-align right
                font-size 13px
                padding-right 12px
                -ms-flex-align center
                -webkit-box-pack end
                -ms-flex-pack end
                justify-content flex-end
            .cell-arrow:after
                margin-left 2.5px
                margin-right -4px
                display block
                font-family YDUI-INLAY
                font-size 14.000000000000002px
                color #c9c9c9
                content "\E608"
.out-log
    width 100%
    height 45px
    background #fff
    border none
    font-size 16px
    font-weight 4000
    corlor #525252
</style>
