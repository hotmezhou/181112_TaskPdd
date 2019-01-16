<template>
    <div class="item order-record">
        <table width="100%" border="0" align="center" class="table">
            <tbody>
            <tr>
                <th height="30" align="center" bgcolor="#f8f8f8">操作者</th>
                <th height="30" align="center" bgcolor="#f8f8f8">操作内容</th>
                <th height="30" align="center" bgcolor="#f8f8f8">记录时间</th>
            </tr>
            <slot/>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "DetailOrderRecord",
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>