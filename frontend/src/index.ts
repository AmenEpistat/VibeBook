import { createRouter, createWebHistory } from 'vue-router';
import PromoMainPage from '@/views/PromoMainPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import PreferencesPage from '@/views/PreferencesPage.vue';
import CommonBooksPage from '@/views/CommonBooksPage.vue';
import BookPage from '@/views/BookPage.vue';
import AuthorsPage from '@/views/AuthorsPage.vue';
import GenresPage from '@/views/GenresPage.vue';

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
        {
            path: '/preference',
            name: 'preference',
            component: PreferencesPage,
        },
        {
            path: '/books',
            name: 'books',
            component: CommonBooksPage,
        },
        {
            path: '/books/:id',
            name: 'book',
            component: BookPage,
        },
        {
            path: '/authors',
            name: 'authors',
            component: AuthorsPage,
        },
        {
            path: '/genres',
            name: 'genres',
            component: GenresPage,
        },
    ],
});

export default router;
