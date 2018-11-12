<template>
    <div class="home">
        <home-header>
            多多好评-首页
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
        <div class="home-box">
            <yd-rollnotice autoplay="2000" >
                <yd-rollnotice-item><span style="color:#F00;"> 荐 </span> 邀请新用户，奖励翻倍奖品翻倍！</yd-rollnotice-item>
                <yd-rollnotice-item><span style="color:#F00;"> 下单时请勿使用任何优惠券，系统检测到或投诉，封号处理。 </span></yd-rollnotice-item>
                <yd-rollnotice-item><span style="color:#F00;"> 荐 </span> 京东服饰 早春新品低至7折</yd-rollnotice-item>
            </yd-rollnotice>
        </div>
        <!-- -->
        <div class="home-box">
            <yd-grids-group :rows="2">
                <yd-grids-item>
                    <yd-icon slot="icon" name="home" color="#FF685D"></yd-icon>
                    <span slot="text">iconfont</span>
                </yd-grids-item>
                <yd-grids-item>
                    <yd-icon slot="icon" name="home" color="#FF685D"></yd-icon>
                    <span slot="text">iconfont</span>
                </yd-grids-item>
                <yd-grids-item>
                    <yd-icon slot="icon" name="home" color="#FF685D"></yd-icon>
                    <span slot="text">iconfont</span>
                </yd-grids-item>
                <yd-grids-item>
                    <yd-icon slot="icon" name="home" color="#FF685D"></yd-icon>
                    <span slot="text">iconfont</span>
                </yd-grids-item>
            </yd-grids-group>
        </div>

    </div>
</template>

<script>
    import HomeHeader from "../../components/Header/HomeHeader"

    export default {
        name: 'Home',
        components: {
            HomeHeader
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixins.styl"
    .home
        margin-top 45px
        overflow hidden
    .home-box
        top-border-1px(#e4e4e4)
        bottom-border-1px(#e4e4e4)
        margin-top 5px
        padding 0 10px;
        background-color #ffffff
</style>