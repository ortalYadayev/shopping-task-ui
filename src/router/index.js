import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('../views/Admin.vue'),
    },
    {
        path: '/stats',
        name: 'Stats',
        component: () => import('../views/Stats1.vue'),
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
