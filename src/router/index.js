import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import My from '@/views/My'
import Video from '@/views/Video'
import Question from '@/views/Question'
import Search from '@/views/Search'
import Article from '@/views/Article'
import UserProfile from '@/views/userProfile'
import History from '@/views/History'
import Fans from '@/views/Fans'
const router = new VueRouter({
    routes: [
        { path: '/login', component: Login },
        { path: '/', redirect: '/home' },
        {
            path: '/layout', component: Layout, redirect: '/home',
            children: [
                {
                    path: '/home', name: 'home', component: Home
                },
                { path: '/my', name: 'my', component: My },
                { path: '/video', name: 'video', component: Video },
                { path: '/question', name: 'question', component: Question }
            ]
        },
        { path: '/search', name: 'search', component: Search },
        // 动态拼接路径地址
        { path: '/article/:articleId', name: 'article', component: Article, props: true },
        // props: true 开启props传参，就是把路由参数映射到组件的props数据中
        { path: '/userprofile', component: UserProfile },
        { path: '/history', component: History },
        { path: '/fans', component: Fans }

    ]
})
export default router