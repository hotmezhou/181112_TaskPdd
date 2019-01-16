<template>
    <div class="order">
        <home-header>
            <span slot="icon-left">
                <a href="javascript:;" @click="$router.back()">
                    <i class="iconfont icon-return"></i>
                </a>
            </span>
            <span slot="title">我的任务</span>
        </home-header>
        <order-list></order-list>
    </div>
</template>
<script>
    import HomeHeader from "../../components/Header/HomeHeader"
    import OrderList from "../../components/Order/OrderList"

    export default {
        name: "Order",
        components: {
            HomeHeader,
            OrderList
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.order
    margin-top 45px
    overflow hidden
</style>
