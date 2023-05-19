import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible'
import '@/mobile/flexible'
import '@/style/reset.css'
import router from '@/router/index'
// 引入base64加密传输数据
import Base64 from 'js-base64'
Vue.use(Base64)


Vue.prototype.$bus = new Vue()
// 全局注册vant组件
import { NavBar, Toast, Tabbar, TabbarItem, Notify, Col, Row, Image as VanImage, Lazyload, Cell, CellGroup, Icon, Search, Tag, Form, Field, Button } from 'vant';
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


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
