<template>
    <section class="login-container">
        <div class="loginInner">
            <div class="login_header">
                <h2 class="login_logo">登 录</h2>
                <div class="login_header_title">
                    <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">密码登录</a>
                    <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">短信登录</a>
                </div>
            </div>
            <div class="login_content">
                <form @submit.prevent="login">
                    <!--密码登录-->
                    <div :class="{on: loginWay}">
                        <section>
                            <section class="login_message">
                                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                            </section>
                            <section class="login_verification">
                                <input type="text" maxlength="30" placeholder="密码" v-if="showPwd" v-model="pwd">
                                <input type="password" maxlength="30" placeholder="密码" v-else v-model="pwd">
                                <div class="switch_button off" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                                    <div class="switch_circle" :class="{right: showPwd}"></div>
                                    <span class="switch_text">{{showPwd?'abc':'***'}}</span>
                                </div>
                            </section>
                        </section>
                    </div>
                    <!--短信登录-->
                    <div :class="{on: !loginWay}">
                        <section class="login_message">
                            <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                            <a :disabled="!rightPhone" class="get_verification"
                                    :class="{right_phone: rightPhone}"
                                    @click.prevent="getCode">
                                {{computeTime>0 ? '已发送'+computeTime+'s' : '获取验证码'}}
                            </a>
                        </section>
                        <section class="login_verification">
                            <input type="number" maxlength="4" placeholder="验证码" v-model="code">
                        </section>
                    </div>
                    <section class="login_hint">
                        <a href="javascript:;" @click="loginWay=true" v-if="loginWay">[ 忘记密码 ]</a>
                    </section>
                    <button class="login_submit">登录</button>
                </form>
            </div>

            <a href="javascript:" class="go_back" @click="$router.back()">
                <i class="iconfont icon-return"></i>
            </a>
        </div>
        <AlertTip :alert-text="alertText" v-show="alertShow" @closeTip="closeTip"></AlertTip>
    </section>
</template>

<script>
    import AlertTip from '../../components/AlertTip/AlertTip'
    import {reqSendCode,reqSmsLogin,reqPwdLogin} from "../../api";

    export default {
        name: "Login",
        data() {
            return {
                loginWay: true, //true代表密码登录， false代表短信登录
                computeTime: 0, //计时时间
                showPwd: false, //false不显示密码， true显示密码

                //表单
                phone: '', //手机号码
                code: '', //短信验证码
                pwd: '', //密码

                alertText: '', //提示文本
                alertShow: false, //是否显示提示框
            }
        },
        //计算属性
        computed: {
            rightPhone() {
                return /^1\d{10}$/.test(this.phone)
            },
        },
        //执行方法
        methods: {
            // 异步获取短信验证码
            async getCode() {
                //如果当前没有计时
                if (!this.computeTime) {
                    //启动倒计时
                    this.computeTime = 30
                    this.intervalId = setInterval(() => {
                        this.computeTime--
                        if (this.computeTime <= 0) {
                            //停止计时
                            clearInterval(this.intervalId)
                        }
                    }, 1000)
                }
                //发送Ajax请求（提交到后台API发送验证码）
                const result = await reqSendCode(this.phone)
                if (result.code !== 0){
                    //显示提示
                    this.showAlert(result.msg)
                    //停止倒计时
                    if (this.computeTime = 0){
                        clearInterval(this.intervalId)
                        this.intervalId = undefined
                    }
                }
            },

            //异步登录
            async login() {
                let result
                //前台表单验证
                if (this.loginWay)  {//密码登录
                    const {rightPhone,phone,pwd} = this
                    if (!rightPhone){
                        //手机号码不正确
                        this.showAlert('手机号码不正确')
                        return
                    }else if (!this.pwd){
                        //密码必须填写
                        this.showAlert('密码必须填写')
                        return
                    }
                    //发送AJAX请求
                    result = await reqPwdLogin(phone,pwd)
                }else {//短信登录
                    const {rightPhone,phone,code} = this //解构赋值
                    if (!rightPhone){
                        //手机号码不正确
                        this.showAlert('手机号码不正确')
                        return
                    }else if (!/^\d{4}$/.test(code)){
                        //code错误
                        this.showAlert('验证码错误')
                        return
                    }
                    //发送AJAX请求
                    result = await reqSmsLogin(phone,code)
                }
                //根据结果数据处理
                if (result.code === 0){
                    const user = result.data
                    //写入VUEX
                    this.$store.dispatch('recordUser',user)
                    //写入localStorage
                    localStorage.setItem('user',user)
                    //跳转用户中心
                    this.$router.replace('/user')
                    return
                }else {
                    this.showAlert(result.msg)
                    return
                }
            },
            showAlert(alertText){
                this.alertText = alertText
                this.alertShow = true
            },
            closeTip(){
                this.alertText = ''
                this.alertShow = false
            },
        },

        components:{
            AlertTip
        }

    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixins.styl"
    .login-container
        width 100%
        height 100%
        .loginInner
            padding-top 60px
            width 80%
            margin 0 auto
            .login_header
                .login_logo
                    font-size 40px
                    font-weight bold
                    color #ff5722
                    text-align center
                .login_header_title
                    padding-top 40px
                    text-align center
                    > a
                        color #333
                        font-size 14px
                        padding-bottom 4px
                        &:first-child
                            margin-right 40px
                        &.on
                            color #ff5722
                            font-weight 700
                            border-bottom 2px solid #ff5722
            .login_content
                > form
                    > div
                        display none
                        &.on
                            display block
                        input
                            width 100%
                            height 100%
                            padding-left 10px
                            box-sizing border-box
                            border 1px solid #ddd
                            border-radius 4px
                            outline 0
                            font 400 14px Arial
                            &:focus
                                border 1px solid #ff5722
                        .login_message
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #fff
                            .get_verification
                                position absolute
                                top 50%
                                right 10px
                                transform translateY(-50%)
                                border 0
                                color #ccc
                                font-size 14px
                                background transparent
                                &.right_phone
                                    color: #000
                        .login_verification
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #fff
                            .switch_button
                                font-size 12px
                                border 1px solid #ddd
                                border-radius 8px
                                transition background-color .3s, border-color .3s
                                padding 0 6px
                                width 35px
                                height 16px
                                line-height 16px
                                color #fff
                                position absolute
                                top 50%
                                right 10px
                                transform translateY(-50%)
                                &.off
                                    background #fff
                                    .switch_text
                                        float right
                                        color #ddd
                                &.on
                                    background #ff5722
                                > .switch_circle
                                    //transform translateX(27px)
                                    position absolute
                                    top -1px
                                    left -1px
                                    width 16px
                                    height 16px
                                    border 1px solid #ddd
                                    border-radius 50%
                                    background #fff
                                    box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                                    transition transform .3s
                                    &.right
                                        transform translateX(21px)
                    .login_hint
                        text-align right
                        margin-top 12px
                        color #999
                        font-size 14px
                        line-height 20px
                        > a
                            color #ff5722
                    .login_submit
                        display block
                        width 100%
                        height 42px
                        margin-top 30px
                        border-radius 4px
                        background #ff5722
                        color #fff
                        text-align center
                        font-size 16px
                        line-height 42px
                        border 0
                .about_us
                    display block
                    font-size 12px
                    margin-top 20px
                    text-align center
                    color #999
            .go_back
                position absolute
                top 5px
                left 5px
                width 30px
                height 30px
                > .iconfont
                    font-size 20px
                    color #999
</style>