<template>
    <ul class="flow-list-ul">
        <li class="note-flow hava-img">
            <a href="" class="content">
                <span class="wrap-img" style="width: 80px; height: 80px;">
                    <img src="https://upload-images.jianshu.io/upload_images/48820-4accd7829676b2fe?imageMogr2/auto-orient/strip|imageView2/1/w/160/h/160/format/webp">
                </span>
                <div content="summary">
                    <h6 class="title">{{goods.goods_name}}</h6>
                    <p class="abstract">
                        HR安排10点面试，程序员：还没起床！家里有矿，工作就是为了体验生活 有一名程序员提前告知了公司上午不方便面试，而...
                    </p>
                </div>
                <div class="meta">买家经验</div>
            </a>
        </li>
        <li class="note-flow hava-img">
            <a href="" class="content">
                <span class="wrap-img" style="width: 80px; height: 80px;">
                    <img src="https://upload-images.jianshu.io/upload_images/48820-4accd7829676b2fe?imageMogr2/auto-orient/strip|imageView2/1/w/160/h/160/format/webp">
                </span>
                <div content="summary">
                    <h6 class="title">标题文章</h6>
                    <p class="abstract">
                        HR安排10点面试，程序员：还没起床！家里有矿，工作就是为了体验生活 有一名程序员提前告知了公司上午不方便面试，而...
                    </p>
                </div>
                <div class="meta">买家经验</div>
            </a>
        </li>
    </ul>
</template>

<script>
    import {mapState} from "vuex"
    export default {
        name: "HomeArticlelist",
        props:{
            title: String
        },
        computed:{
            ...mapState(['goods'])
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.flow-list-ul
    margin-top 15px
    position relative
    min-height 100%
    width 100%
    background-color #ffffff
.note-flow
    position relative
    width 100%
    word-wrap break-word
    padding 15px 18px
    border-bottom 1px solid #f0f0f0
    .content
        margin-top 6px
        display block
        .wrap-img
            position absolute
            top 50%
            right 15px
            margin-top -40px
            border-radius 5px
            img
                width 100%
                height 100%
        .summary
            overflow hidden
        .title
            font-size 18px
            font-weight 700
            color #333
            overflow hidden
            text-overflow ellipsis
            display -webkit-box
            line-height 25px
            max-height 50px
            box-sizing content-box
            white-space normal
        .abstract
            margin-top 6px
            font-size 13px
            color #999
            overflow hidden
            text-overflow ellipsis
            display -webkit-box
            -webkit-line-clamp 2
            -webkit-box-orient vertical
            line-height 19px
            max-height 38px
            -webkit-box-sizing content-box
            box-sizing content-box
            white-space normal
    .meta
        margin-top 8px
        line-height 22px
.hava-img
    .content
        padding-right 95px
    .meta
        padding-right 95px

</style>
