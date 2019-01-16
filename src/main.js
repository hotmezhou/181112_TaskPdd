// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.px.css';
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */
const FastClick = require('fastclick');

Vue.config.productionTip = false

Vue.use(YDUI)

const app = new Vue({
    render: v => v(App),
    router,
    store,
}).$mount('#app');

document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
}, false);