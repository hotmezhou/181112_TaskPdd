<template>
    <section class="recharge">
        <home-header>
            <span slot="title">充值中心</span>
        </home-header>
        <dl class="user-info">
            <dt><img src="/static/images/alipaylogo.png"></dt>
            <dd>
                <label>收款账号:</label>
                <span>1762****870</span>
            </dd>
            <dd>
                <label>支付备注:</label>
                <span>{{userInfo.userAccount || ''}}</span>
            </dd>
        </dl>
        <div class="bonuses"><img src="/static/images/hongbao.png"></div>
        <div class="qr-code">
            <img src="/static/images/qrcode.png">
            <p>充值请备注：{{userInfo.userAccount || ''}}</p>
        </div>
    </section>
</template>

<script>
import {mapState} from 'vuex'
import HomeHeader from '../../components/Header/HomeHeader'
    export default {
        name: "Recharge",
        components:{
            HomeHeader,
        },
        computed:{
            ...mapState(['userInfo','userToken'])
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
body
    background-color rgba(255, 87, 34, 0.27)
.recharge
    margin-top 45px
    overflow hidden
    .user-info
        position relative
        margin 20px 40px
        padding 20px
        background-color #fff
        border-radius 10px
        dt
            position absolute
            width 85px
            img
                width 100%
        dd
            margin-left 100px
            label
                font-weight 600
            span
                color #ff5722
                font-size 14px
    .bonuses
        text-align
        width 100%
        padding 5px 50px
        margin 0
        img
            width 100%
    .qr-code
        margin 20px 40px
        padding 20px
        background-color #fff
        border-radius 10px
        img
            width 100%
        p
            line-height 40px
            color #ff2424
            font-size 18px
            font-weight 600
            text-align center
</style>