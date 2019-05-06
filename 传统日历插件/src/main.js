import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
fastclick.attach(document.body) //手机滑动流畅
import './common/stylus/index.styl'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {loading: require('common/image/default.png')})
import VueRouter from 'vue-router' //引入vue-router.js
import routes from './router'
Vue.use(VueRouter);
var router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({y: 0}), //加入这一句，可使滚动条滚到顶部
  routes
})
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
