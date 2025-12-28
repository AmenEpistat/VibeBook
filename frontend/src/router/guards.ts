import type { Router } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { computed } from 'vue';

export const setupGuards = (router: Router) => {
    router.beforeEach((to) => {
        const authStore = useAuthStore();
        const isAdmin = computed(() => authStore.user.roles?.[0] === 'ADMIN');

        if (to.meta.requiresAuth && !authStore.isAuth) {
            return {
                name: 'sign-in',
                query: { redirect: to.fullPath },
            };
        }

        if (to.meta.requiresAdmin && !isAdmin.value) {
            return { name: 'profile' };
        }

        if (to.meta.guestOnly && authStore.isAuth) {
            return { name: 'profile' };
        }

        return true;
    });
};
