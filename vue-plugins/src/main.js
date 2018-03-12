import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueScroller from 'vue-scroller'  // 上拉加载，下拉刷新
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload) 

Vue.use(VueScroller)


Vue.config.productionTip = false; // 阻止生产环境的提示信息

Vue.prototype.$http = axios;      // axios请求写入原型

// 适配
(function (doc, win) {
	var docEl = doc.documentElement
	var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
	var recalc = function () {
	var clientWidth = docEl.clientWidth
	if (!clientWidth) return
		docEl.style.fontSize = 20 * (clientWidth / 375) + 'px'
	}
	if (!doc.addEventListener) return
	win.addEventListener(resizeEvt, recalc, false)
	doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	// template: '<App/>',
	// components: { App }
})
