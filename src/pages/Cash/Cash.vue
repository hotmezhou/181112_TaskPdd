<template>
    <section class="cash">
        <header-top title="提现"></header-top>
        <div class="account">
            <p>可提现金额：<strong>￥{{buyerAccountInfo.balance}}</strong> 元</p>
        </div>
        <div class="cash-box">
            <div v-if="buyerAccountInfo.isValid === 1">
                <p>支付宝户名：{{buyerAccountInfo.name}}</p>
                <p>支付宝账号：{{buyerAccountInfo.alipay_account}}</p>
            </div>
            <div v-else-if="buyerAccountInfo.isValid === 2">
                实名认证审核中...
            </div>
            <div v-else-if="buyerAccountInfo.isValid === 3">
                审核失败  <router-link to="/auth">【重新认证】</router-link>
            </div>
            <div v-else>
                <p class="warning"><strong>您的账户还未实名认证！</strong> <router-link to="/auth">【前往认证】</router-link></p>
            </div>
            <div class="cash-form">
                <p>提现金额</p>
                <em>￥</em>
                <input type="number" placeholder="0.00" v-model="money">
            </div>
            <ul class="cash-hint">
                <li>- 提现审核周期为48小时，工作日12小时内处理完毕，节假日顺延。</li>
                <li>- 每天提现次数为1次，超出将收取每笔0.5元手续费！</li>
            </ul>
            <button @click="submitCash">确认提现</button>
        </div>
        <div class="title">我的提现记录</div>
        <cash-list></cash-list>
    </section>
</template>

<script>
import HeaderTop from '../../components/Header/HeaderTop'
import CashList from '../../pages/Record/Cash/Cash'
import {reqCash,reqMyBuyerAccount} from '../../api'
    export default {
        name: "Cash",
        data(){
            return{
                money: '',
                buyerAccountInfo:{}
            }
        },
        components:{
            HeaderTop,
            CashList
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
                this.reload();
            },

            async submitCash(){
                this.$dialog.loading.open('提交申请中...')
                const result = await reqCash(this.money)
                this.$dialog.loading.close()
                if (result.code === 0){
                    this.$dialog.toast({
                        mes: '申请成功！',
                        timeout: 1500,
                        icon: 'success'
                    });

                }else {
                    this.$dialog.toast({
                        mes: '提现失败！',
                        timeout: 1500,
                        icon: 'error'
                    });
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.cash
    font-size 14px
    .warning
        color: #ff2424
    .account
        margin-top 45px
        margin-bottom 2px
        width 100%
        padding 15px 15px
        background #fff
        p
            font-size 14px
        strong
            font-size 16px
            color #ff5722
    .cash-box
        background-color #ffffff
        padding 15px
        p
            line-height 25px
        button
            width 100%
            margin 15px 0
            border 0
            border-radius 2px
            display block
            line-height 45px
            background linear-gradient(to right , #ff8007, #ff5722)
            color #fff
            font-size 16px
            font-weight 600
        .cash-form
            background-color #f9f9f9
            border 1px solid #f1f1f1
            border-radius 5px
            padding 20px 15px
            margin 20px 0
            &::after
                clear both
                content ""
                display block
                width 0
                height 0
                visibility hidden
            p
                margin-bottom 15px
            em
                float left
                line-height 26px
                display table-cell
                vertical-align bottom
            input
                border 0
                background none
                width 90%
                height 26px
                float left
                font-size 26px
                line-height 26px
                font-family '微软雅黑 Light'
    .cash-hint
        color #888888
        li
            line-height 25px
    .title
        line-height 50px
        background-color #fff
        margin-top 15px
        margin-bottom 2px
        text-align center
        font-size 16px

</style>
