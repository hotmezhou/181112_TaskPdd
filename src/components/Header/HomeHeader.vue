<template>
    <div class="nav-bar">
        <div class="nav-bar_left">
            <router-link to="#" slot="left">
                <!--<i class="iconfont icon-stealth_fill"></i>-->
            </router-link>
        </div>
        <div class="nav-bar_title">
            <slot />
        </div>
        <div class="nav-bar_right">
            <router-link to="/login" slot="right">
                <i class="iconfont icon-guanyanren"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeHeader"
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    a
        color #ffffff
    .iconfont
        font-size 26px
    .nav-bar
        height 45px
        line-height 45px
        position fixed
        z-index 100
        left 0
        right 0
        top 0
        width 100%
        -webkit-user-select none //禁止用户选择
        user-select none //禁止用户选择
        text-align center
        background-color #FF5722
        .nav-bar_left,.nav-bar_right
            height 45px
            line-height 45px
            position absolute
            bottom 0
        .nav-bar_left
            left 15px
            &:span
                font-size 20px
        .nav-bar_right
            right 15px
        .nav-bar_title
            color #ffffff
            margin 0 auto
            max-width 60%
            font-size 16px
            font-weight 500




</style>
