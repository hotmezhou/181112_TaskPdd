<template>
    <div id="app">
        <router-view v-if="isRouterAlive"/>
        <footer-guide v-show="$route.meta.showFooter"/>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import FooterGuide from "./components/FooterGuide/FooterGuide";

    export default {
        name: 'app',
        provide(){
            return {
                reload: this.reload
            }
        },

        data(){
            return {
                isRouterAlive: true
            }
        },
        //vue实例挂载的事件钩子函数(所以它只会执行一次)
        mounted() {
            //this.$store.dispatch('getGoods')
            this.getGoods()
            this.getUserInfo()
            // const result = await reqGoods()
            // console.log(result)
            // this.getGoods()
        },

        //方法
        methods: {
            ...mapActions(['getUserInfo','getGoods']),
            //刷新方法
            reload(){
                this.isRouterAlive = false
                this.$nextTick(function(){
                    this.isRouterAlive = true
                })
            }
        },
        //组件映射
        components: {
            FooterGuide
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    #app
        padding-bottom 55px
</style>
