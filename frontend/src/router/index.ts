import { createRouter, createWebHistory } from 'vue-router';
import PromoMainPage from '@/views/PromoMainPage.vue';
import LoginPage from '@/views/LoginPage.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Promo',
            component: PromoMainPage,
        },
        {
            path: '/signIn',
            name: 'signIn',
            component: LoginPage,
        },
        {
            path: '/signUp',
            name: 'signUp',
            component: LoginPage,
        },
    ],
});

export default router;
