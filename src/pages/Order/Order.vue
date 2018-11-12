<template>
    <div>
        <yd-navbar>
            <router-link to="#" slot="left">
                <yd-navbar-back-icon>返回</yd-navbar-back-icon>
            </router-link>

            <img slot="center" src="http://static.ydcss.com/www/img/logo.png"/>

            <router-link to="#" slot="right">
                <yd-navbar-next-icon>前进</yd-navbar-next-icon>
            </router-link>
        </yd-navbar>
    </div>
</template>

<script>
    export default {
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
