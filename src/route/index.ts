import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
// vue2:
// import Vue from 'vue'
// Vue.use(VueRouter)
// createRouter, createWebHashHistory(是方法)
const routes: RouteRecordRaw[] = [
    {
        path: '/', name: 'Layout',
        component: () => import('@/views/Layout/index.vue')
    },
    {
        path: '/',
        name: 'Login',
        component: () => import('../views/Login/index.vue')
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router