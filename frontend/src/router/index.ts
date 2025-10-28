import { createRouter, createWebHistory } from 'vue-router';
import PromoMainPage from '@/views/PromoMainPage.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Promo',
            component: PromoMainPage,
        },
    ],
});

export default router;
