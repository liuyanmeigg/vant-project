import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import registerDoctorManage from '../views/userCenter/userManage/registerDoctorManage/index.vue'
import platformAdministrator from '../views/userCenter/userManage/platformAdministrator/index.vue'
import Edit from '../views/userCenter/userManage/registerDoctorManage/edit/edit.vue'
import Add from '../views/userCenter/userManage/registerDoctorManage/add/Add.vue'
import detailInfo from '../views/userCenter/userManage/registerDoctorManage/detailInfo/detailInfo.vue'
import EditPassword from '../views/userCenter/userManage/registerDoctorManage/editPassword/EditPassword.vue'
import AddEdit from '../views/userCenter/userManage/platformAdministrator/addEdit/AddEdit.vue'
import columnSetting from '../views/userCenter/contentManage/columnSetting/ColumnSetting.vue'
// import AddEditChild from '../views/userCenter/contentManage/columnSetting/addEdit/AddEditChild.vue'
import editChild from '../views/userCenter/contentManage/columnSetting/addEdit/Edit.vue'
import addChild from '../views/userCenter/contentManage/columnSetting/addEdit/Add.vue'
import Friendlink from '../views/userCenter/contentManage/friendLink/FriendLink.vue'
import Corporate from '../views/userCenter/contentManage/corporate/Corporate.vue'
import Servicer from '../views/userCenter/contentManage/servicer/Servicer.vue'
import UploadVideos from '../views/userCenter/contentManage/uploadVideos/UploadVideos.vue'

import { Base64 } from 'js-base64';
Vue.use(VueRouter)

const routes = [
  {
    // 用户管理
    path: '/', component: Home,
    children: [
      { path: '/', reactive: '/registerDoctorManage', meta: { title: '后台管理系统主页' } },
      { path: '/registerDoctorManage', component: registerDoctorManage, meta: { title: '注册医师' } },
      // 平台管理员
      { path: '/platformAdministrator', component: platformAdministrator, meta: { title: '平台管理员' } },
      { path: '/edit', name: 'edit', component: Edit, meta: { title: '编辑' } },
      { path: '/detailInfo', name: 'detailInfo', component: detailInfo, meta: { title: '详情' }, },
      { path: '/editPassword', name: 'editPassword', component: EditPassword, meta: { title: '修改密码' }, },
      { path: '/addEdit', name: 'addEdit', component: AddEdit, meta: { title: '添加' }, },
      { path: '/add', component: Add, meta: { title: '添加' } },
      // 内容管理
      { path: '/columnSetting', component: columnSetting, meta: { title: '栏目设置' } },
      { path: '/editChild', component: editChild, meta: { title: '编辑' } },
      { path: '/addChild', component: addChild, meta: { title: '添加' } },
      // 友情链接
      { path: '/friendlink', component: Friendlink, meta: { title: '友情链接' } },
      // 企业会员
      { path: '/corporate', component: Corporate, meta: { title: '企业会员' } },
      // 服务商
      { path: '/servicer', component: Servicer, meta: { title: '服务商' } },
      { path: '/uploadVideos', component: UploadVideos, meta: { title: '上传视频' } },





    ]
  },




  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由前置导航守卫
router.beforeEach((to, from, next) => {
  // 根据路由元信息设置文档标题
  if (to.path.indexOf('/detailInfo') !== -1) {
    // console.log(to);
    const obj = JSON.parse(Base64.decode(to.query.info))
    document.title = obj.orgName;
  } else {
    document.title = to.meta.title || '后台管理系统主页'
  }
  next()
})

export default router
