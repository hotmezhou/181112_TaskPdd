<template>
    <section class="record">
        <home-header>
            <span slot="title">我的账单</span>
        </home-header>
        <section class="account">
            <p>账户余额：<strong>￥{{buyerAccountInfo.balance}}</strong></p>
        </section>
        <div class="tab">
            <div class="tab-item">
                <router-link to="/record/bill">资金账单</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/record/recharge">充值记录</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/record/cash">提现记录</router-link>
            </div>
        </div>
        <router-view/>
    </section>
</template>

<script>
    import {mapState} from 'vuex'
    import HomeHeader from '../../components/Header/HomeHeader'
    import {reqMyBuyerAccount} from "../../api"
    export default {
        name: "Record",
        data(){
            return{
                // 买手账户相关资料
                buyerAccountInfo: {}
            }
        },
        components:{
            HomeHeader,
        },
        computed:{
            ...mapState(['userInfo','userToken'])
        },
        mounted(){
            this.getMyBuyerAccount()
        },
        methods:{
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
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .record
        margin-top 45px
        overflow hidden
        position relative
    .account
        height 100px
        width 100%
        padding 25px
        color #fff
        background linear-gradient(to right, #ff711a, #ff5722)
        p
            font-size 16px
        strong
            font-size 26px
    .tab
        height 45px
        line-height 45px
        background #fff
        margin-bottom 2px
        .tab-item
            float left
            width: 33.33333%
            text-align center
            font-size 14px
        a
            display block
            position relative
            &.router-link-active
                color #ff5722
                &::after
                    content ''
                    position absolute
                    left 50.5%
                    bottom 1px
                    width 60px
                    height 2px
                    transform translateX(-50%)
                    background #ff5722
</style>
