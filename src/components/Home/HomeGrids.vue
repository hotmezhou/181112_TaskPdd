<template>
    <div class="home-grids">
        <router-link to="/login" class="grids-item" replace>
            <span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-juanzhouchunlian"></use>
                </svg>
            </span>
            <span>买家必读</span>
        </router-link>
        <div class="grids-item">
            <span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yuanbao"></use>
                </svg>
            </span>
            <span>商家技巧</span>
        </div>
        <div class="grids-item">
            <span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-hongbao-"></use>
                </svg>
            </span>
            <span>邀请奖励</span>
        </div>
        <div class="grids-item">
            <span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-facai"></use>
                </svg>
            </span>
            <span>常见问题</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeGrids"
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"
.icon
    width 4em
    height 4em
    vertical-align -0.15em
    fill currentColor
    overflow hidden
.home-grids
    margin-top 5px
    background-color #ffffff
    display flex
    -webkit-box-flex 1
    flex 1
    align-items center
    .grids-item
        display flex
        -webkit-box-flex 1
        flex 1
        flex-direction column
        padding 15px 0
        text-align center
        span
            margin-top 3px
</style>