<template>
    <div class="home">
        <home-header>
            <span slot="title">多多好评-首页</span>
        </home-header>
        <yd-slider autoplay="3000">
            <yd-slider-item>
                <img src="../Home/images/swiper-1.jpg">
            </yd-slider-item>
            <yd-slider-item>
                <img src="../Home/images/swiper-2.png">
            </yd-slider-item>
        </yd-slider>
        <!--快报-->
        <div class="rollnotice">
            <yd-rollnotice autoplay="2000" >
                <yd-rollnotice-item><span style="color:#ff5722;"> 邀请新用户，奖励翻倍奖品翻倍！</span></yd-rollnotice-item>
                <yd-rollnotice-item><span style="color:#4cd96f;"> 下单时请勿使用任何优惠券，系统检测到或投诉，封号处理。 </span></yd-rollnotice-item>
            </yd-rollnotice>
        </div>
        <!-- 新手指南 -->
        <home-grids/>
        <!-- 赚红包排行列表 -->
        <home-invitelist/>
        <!-- 文章列表-->
    </div>
</template>

<script>
    import HomeHeader from "../../components/Header/HomeHeader"
    import HomeGrids from "../../components/Home/HomeGrids"
    import HomeInvitelist from "../../components/Home/HomeInvitelist"
    import HomeArticlelist from "../../components/Home/HomeArticlelist"
    export default {
        name: 'Home',
        components: {
            HomeHeader,
            HomeGrids,
            HomeInvitelist,
            HomeArticlelist
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixins.styl"
    .home
        margin-top 45px
        overflow hidden
    .rollnotice
        margin-top 5px
        padding 0 10px;
        background-color #ffffff
</style>
