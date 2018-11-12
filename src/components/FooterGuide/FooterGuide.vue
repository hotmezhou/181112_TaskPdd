<template>
    <div class="footer-guide">
        <span class="guide-item" :class="{on: '/home'===$route.path}" @click="goTo('/home')">
            <span class="item-icon">
                <i class="iconfont icon-homepage"></i>
            </span>
            <span>
                首页
            </span>
        </span>

        <span class="guide-item" :class="{on: '/task'===$route.path}" @click="goTo('/task')">
            <span class="item-icon">
                <i class="iconfont icon-manage"></i>
            </span>
            <span>
                任务大厅
            </span>
        </span>

        <span class="guide-item" :class="{on: '/invite'===$route.path}" @click="goTo('/invite')">
            <span class="item-icon">
                <i class="iconfont icon-redpacket"></i>
            </span>
            <span>
                赚红包
            </span>
        </span>

        <span class="guide-item" :class="{on: '/order'===$route.path}" @click="goTo('/order')">
            <span class="item-icon">
                <i class="iconfont icon-order"></i>
            </span>
            <span>
                我的任务
            </span>
        </span>

        <span class="guide-item" :class="{on: '/user'===$route.path}" @click="goTo('/user')">
            <span class="item-icon">
                <i class="iconfont icon-mine"></i>
            </span>
            <span>
                会员中心
            </span>
        </span>
    </div>
</template>

<script>
    export default {
        name: 'FooterGuide',
        methods: {
            goTo(path) {
                this.$router.replace(path)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixins.styl"
    .footer-guide
        top-border-1px(#e4e4e4)
        position fixed
        z-index 100
        left 0
        right 0
        bottom 0
        background-color #ffffff
        width 100%
        height 50px
        display flex
        .guide-item
            display flex
            flex 1
            text-align center
            flex-direction column
            align-items center
            color #999999
            padding-top 2px
            &.on
                color #FF5722
            span
                font-size 12px
                margin-top 2px
                .iconfont
                    font-size 24px
</style>
