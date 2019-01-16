<template>
    <section>
        <yd-infinitescroll :callback="loadList" ref="infinitescrollOrderList">
            <yd-list slot="list">
                <ul class="record-list">
                    <li class="record-item" v-for="(bill, key) in billList" :key="key">
                        <div class="money orange">{{bill.sum}}</div>
                        <label>{{bill.content}}</label>
                        <p>编号：{{bill.pddTaskId}}</p>
                        <p>时间：{{bill.createTime}}</p>
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
    import {reqRecordBill} from "../../../api"
    export default {
        name: "Bill",
        data(){
            return{
                limit: 10,
                page: 1,
                pageSize: '',
                billList :[]
            }
        },
        mounted(){
            this.getBillList()
        },
        computed:{

        },
        methods:{
            async getBillList(){
                this.$dialog.loading.open('账单加载中...')
                const result = await reqRecordBill(this.limit,this.page)
                this.$dialog.loading.close()
                // 判断返回成功
                if (result.code === 0){
                    this.billList = result.data
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
                const result = await reqRecordBill(this.limit,this.page)
                if (result.code === 0){
                    //新获取输入加入到原始数据中
                    this.billList = this.billList.concat(result.data)
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
