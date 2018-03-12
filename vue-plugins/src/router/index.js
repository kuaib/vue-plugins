import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)
// 索引页面
const indexPage = r => require.ensure([], () => r(require('../pages/indexPage/indexPage')), 'indexPage')

// 一般我用于纵向滚动
const betterScroll = r => require.ensure([], () => r(require('../pages/betterScroll/betterScroll')), 'betterScroll')

// 比较好的滚动上拉加载，下拉刷新插件
const mescroll = r => require.ensure([], () => r(require('../pages/mescroll/mescroll')), 'mescroll')

// 懒加载
const vueLazyload = r => require.ensure([], () => r(require('../pages/vueLazyload/vueLazyload')), 'vueLazyload')

// 横向滚动1
const rowScroll1 = r => require.ensure([], () => r(require('../pages/rowScroll1/rowScroll1')), 'rowScroll1')

// 横向滚动1
const rowScroll2 = r => require.ensure([], () => r(require('../pages/rowScroll2/rowScroll2')), 'rowScroll2')

// 多张图片上传
const imgUploadMore = r => require.ensure([], () => r(require('../pages/imgUploadMore/imgUploadMore')), 'imgUploadMore')

// 仅一张图片上传
const imgUploadOne = r => require.ensure([], () => r(require('../pages/imgUploadOne/imgUploadOne')), 'imgUploadOne')

// 拖转上传图片，可文件夹，可多图
const imgUploadDrag = r => require.ensure([], () => r(require('../pages/imgUploadDrag/imgUploadDrag')), 'imgUploadDrag')

// echarts图表
const echarts = r => require.ensure([], () => r(require('../pages/echarts/echarts')), 'echarts')

// 复制文本
const copyText = r => require.ensure([], () => r(require('../pages/copyText/copyText')), 'copyText')


export default new Router({
    routes: [
        {
            path: '/',
            component: App,
            children: [
              	{path: '', redirect: '/indexPage'},
                {path: '/indexPage', component: indexPage},
                {path: '/mescroll', component: mescroll },
                {path: '/vueLazyload', component: vueLazyload},
                {path: '/betterScroll', component: betterScroll},
                {path: '/rowScroll1', component: rowScroll1},
                {path: '/rowScroll2', component: rowScroll2},
                {path: '/imgUploadMore', component: imgUploadMore},
                {path: '/imgUploadOne', component: imgUploadOne},
                {path: '/imgUploadDrag', component: imgUploadDrag},
                {path: '/echarts', component: echarts},
                {path: '/copyText', component: copyText},
            ]
        }
    ]
})
