import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'amfe-flexible'
import '@/mobile/flexible.js'
import '@/style/index.less'
import '@/style/cover.less'
import router from '@/router/index'
// 加载dayjs初始化配置
import './utils/dayjs'
/*引入资源请求插件*/
import VueResource from 'vue-resource'

/*使用VueResource插件*/
Vue.use(VueResource)
// 全局注册vant组件
import { NavBar, Toast, Tabbar, TabbarItem, Notify, Col, Row, Image as VanImage, Lazyload, Cell, CellGroup, Icon, Search, Tag, Form, Field, Button, CountDown, Grid, GridItem, Popup, Dialog, Tab, Tabs, List, PullRefresh, Picker, DatetimePicker } from 'vant';
Vue.use(NavBar);
Vue.use(Toast);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Notify);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage);
Vue.use(Lazyload);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Icon);
Vue.use(Search);
Vue.use(Tag);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(CountDown);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Popup);
Vue.use(Dialog);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Picker);
Vue.use(DatetimePicker);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
