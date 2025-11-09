<template>
    <nav class="nav">
        <div class="nav__wrapper container">
            <Logo
                size="xs"
                :is-visible-text="false"
            />
            <v-btn
                theme="icon"
                variant="plain"
                @click="logout"
            >
                <img
                    src="@/assets/img/logout.svg"
                    height="24"
                    width="24"
                    alt="Выйти."
                />
            </v-btn>
        </div>
    </nav>
</template>

<script setup lang="ts">
import Logo from '@/components/Logo.vue';
import { useAuthStore } from '@/stores/authStore.ts';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const logout = async () => {
    await authStore.logout();
    await router.push('/');
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.nav {
    position: fixed;
    inset: 0;
    z-index: 1000;
    max-height: 60px;

    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(3px);
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);

    overflow: hidden;

    .container {
        padding-top: 10px;
    }
}

.nav::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;

    width: 100%;
    height: 100%;

    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);

    transition: all 1s ease;
}

.nav:hover::before {
    left: 100%;
}

.nav__wrapper {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: end;
}
</style>
