import { createRouter, createWebHistory } from 'vue-router';
import PromoMainPage from '@/views/PromoMainPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import PreferencesPage from '@/views/PreferencesPage.vue';
import CommonBooksPage from '@/views/CommonBooksPage.vue';
import BookPage from '@/views/BookPage.vue';
import AuthorsPage from '@/views/AuthorsPage.vue';
import GenresPage from '@/views/GenresPage.vue';
import FilteredBooks from '@/views/FilteredBooks.vue';
import UsersPage from '@/views/UsersPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'promo',
            component: PromoMainPage,
        },
        {
            path: '/sign-in',
            name: 'sign-in',
            component: LoginPage,
            meta: { guestOnly: true },
        },
        {
            path: '/sign-up',
            name: 'sign-up',
            component: LoginPage,
            meta: { guestOnly: true },
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfilePage,
            meta: { requiresAuth: true },
        },
        {
            path: '/books',
            name: 'books',
            component: CommonBooksPage,
            meta: { requiresAuth: true },
        },
        {
            path: '/books/:id',
            name: 'book',
            component: BookPage,
            meta: { requiresAuth: true },
        },
        {
            path: '/authors',
            name: 'authors',
            component: AuthorsPage,
            meta: { requiresAuth: true, requiresAdmin: true },
        },
        {
            path: '/genres',
            name: 'genres',
            component: GenresPage,
            meta: { requiresAuth: true, requiresAdmin: true },
        },
        {
            path: '/preferences',
            name: 'preferences',
            component: PreferencesPage,
            meta: { requiresAuth: true },
        },
        {
            path: '/users',
            name: 'users',
            component: UsersPage,
            meta: { requiresAuth: true, requiresAdmin: true },
        },
        {
            path: '/books/filter/:filter',
            name: 'filteredBooks',
            component: FilteredBooks,
            meta: { requiresAuth: true },
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: NotFoundPage,
        },
    ],
});

export default router;
