<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <img src="./images/swiper-1.jpg" width="100%" class="db " alt="">
            </div>
            <div class="swiper-slide">
                <img src="./images/swiper-2.png" width="100%" class="db " alt="">
            </div>
        </div>
        <!--分页-->
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    import Swiper from "swiper"
    import "swiper/dist/css/swiper.min.css"
    export default {
        name: "Swiper",
        mounted () {
            new Swiper('.swiper-container',{
                loop: true,
                pagination:{
                    el: '.swiper-pagination',

                },
                scrollbar: {
                    el: '.swiper-scrollbar',
                },
            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>