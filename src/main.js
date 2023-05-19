import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/public.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickSpeed: 200,
  minimum: 0.4
})
// 请求的根路径

// 全局过滤器
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear() + 1
  // padStart字符串的补全操作
  const m = (dt.getMonth() + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}),

  //当路由进入前
  router.beforeEach((to, from, next) => {
    // 每次切换页面时，调用进度条
    NProgress.start();
    // 若加载时间长且不定，担心进度条走完都没有加载完，可以调用
    NProgress.inc(); //这会以随机数量递增，且永远达不到100%，也可以设指定增量
    next();
  });
//当路由进入后：关闭进度条
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
