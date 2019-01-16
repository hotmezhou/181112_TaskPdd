<template>
    <div class="home-invitelist">
        <h2>
            <i class="iconfont icon-financial_fill"></i>
            <span>赚红包排行榜</span>
        </h2>
        <ul>
            <li>
                <a href="" class="avatar">
                    <img src="/static/images/head-pic.png">
                </a>
                <div class="other">
                    <a href="">da***</a>
                    <p style="color:#b1b1b1">总红包 7519.60元</p>
                </div>
            </li>
            <li>
                <a href="" class="avatar">
                    <img src="/static/images/head-pic.png">
                </a>
                <div class="other">
                    <a href="">13***</a>
                    <p style="color:#b1b1b1">总红包 5614.10元</p>
                </div>
            </li>
            <li>
                <a href="" class="avatar">
                    <img src="/static/images/head-pic.png">
                </a>
                <div class="other">
                    <a href="">va***</a>
                    <p style="color:#b1b1b1">总红包 5147.00元</p>
                </div>
            </li>
            <li>
                <a href="" class="avatar">
                    <img src="/static/images/head-pic.png">
                </a>
                <div class="other">
                    <a href="">罗蒂***</a>
                    <p style="color:#b1b1b1">总红包 3474.50元</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "HomeInvitelist"
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"

.home-invitelist
    margin-top 5px
    background-color #ffffff
    h2
        bottom-border-1px(#e4e4e4)
        line-height 50px
        padding 0 15px
        .iconfont
            font-size 20px
        span
            font-size 16px
            font-weight normal
    ul
        display flex
        flex-wrap wrap
        align-content: flex-start
    li
        width 50%
        padding 15px
        display flex
        overflow hidden
        position relative
        .avatar
            display flex
            position relative
            width 48px
            height 48px
            margin-right 8px
            img
                width 100%
                height 100%
                border-radius 50%
        .other
            flex 1
            a
                display block
                margin-top 6px
            p
                padding 2px 0
                corlor #e4e4e4

</style>
