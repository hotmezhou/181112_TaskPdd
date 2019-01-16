<template>
    <section>
        <yd-infinitescroll :callback="loadList" ref="infinitescrollOrderList">
            <yd-list slot="list">
                <ul class="record-list">
                    <li class="record-item" v-for="(cash , key) in cashList" :key="key">
                        <div class="money green">- {{cash.sum}}</div>
                        <label v-if="cash.status === 1">提现成功！</label>
                        <label v-else-if="cash.status === 2">提现审核中...</label>
                        <label v-else-if="cash.status === 3">提现失败！</label>
                        <p>支付宝账号：{{cash.alipayAccount}}</p>
                        <p>时间：{{cash.createTime}}</p>
                    </li>
                </ul>
            </yd-list>
            <span slot="doneTip">没有数据啦~~</span>
            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
        </yd-infinitescroll>

    </section>
</template>

<script>
    import {reqRecordCash} from "../../../api"
    export default {
        name: "Cash",
        data(){
            return{
                limit: 10,
                page: 1,
                pageSize: '',
                cashList :[]
            }
        },
        mounted(){
            this.getCashList()
        },
        computed:{

        },
        methods:{
            async getCashList(){
                this.$dialog.loading.open('账单加载中...')
                const result = await reqRecordCash(this.limit,this.page)
                this.$dialog.loading.close()
                // 判断返回成功
                if (result.code === 0){
                    this.cashList = result.data
                    this.pageSize = result.pageSize
                    //this.$store.dispatch('recordTaskList',taskList)
                    if (this.page === this.pageSize){
                        //所有加载完成
                        this.$refs.infinitescrollOrderList.$emit('ydui.infinitescroll.loadedDone')
                    }
                }
            },

            //滚动加载
            async loadList() {
                this.page++;
                const result = await reqRecordCash(this.limit,this.page)
                if (result.code === 0){
                    //新获取输入加入到原始数据中
                    this.cashList = this.cashList.concat(result.data)
                    //判断是否全部数据都加载完了
                    if (this.page === this.pageSize){
                        //所有加载完成
                        this.$refs.infinitescrollOrderList.$emit('ydui.infinitescroll.loadedDone')
                        return
                    }
                    //单次加载完成
                    this.$refs.infinitescrollOrderList.$emit('ydui.infinitescroll.finishLoad')
                }
            },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .record-list
        background-color #fff
        .record-item
            margin 0 10px
            padding 10px 10px
            border-bottom 1px #f5f5f5 solid
            .money
                float right
                padding 20px 5px
                font-size 20px
                font-weight 600
                span
                    font-size 14px
            label
                line-height 25px
                font-size 16px
            p
                line-height 22px
                color #515151
        .record-item:after
            clear both
            content ""
            display block
            width 0
            height 0
            visibility hidden
        .orange
            color #ff5722
        .green
            color #04ab02
</style>
