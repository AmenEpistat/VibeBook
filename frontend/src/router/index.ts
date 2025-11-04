import { createRouter, createWebHistory } from 'vue-router';
import PromoMainPage from '@/views/PromoMainPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import ProfilePage from '@/views/ProfilePage.vue';

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
        {
            path: '/profile',
            name: 'profile',
            component: ProfilePage,
        },
    ],
});

export default router;
