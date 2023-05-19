import Vue from "vue";
import VueRouter from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home'
import Search from '@/views/Search'
import Play from '@/views/Play'
import Comment from '@/views/comment'
import Login from '@/views/Login'
// import { getCookie } from '@/utils/auth.js'
Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        // 一级路由
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        {
            path: '/layout', component: Layout, redirect: '/layout/home',
            // 二级路由
            children: [
                {
                    path: 'home', component: Home, meta: {
                        title: '首页'
                    }
                },
                {
                    path: 'search', component: Search, meta: {
                        title: '搜索'
                    }
                },

            ]
        },
        { path: '/play', component: Play },
        { path: '/comment', component: Comment }

    ]
})
// router.beforeEach((to, from, next) => {
//     // to:即将到达的路由    from:即将离开的路由 next:向下执行的方法
//     console.log(to);
//     console.log(from);
//     if (to.path == "/home") {
//         // 如果是登录页面,放行
//         next();
//     } else {
//         // 如果不是登录页面,验证token。如果有token,则执行next(),否则跳转到登录页面
//         let token = getCookie("token");
//         // console.log(token);
//         if (token) {
//             next();
//         }
//         if (!token) {
//             next("/home");
//         }
//     }
// })
export default router