<template>
    <Header v-if="auth" />
    <router-view />
    <Footer />
</template>

<script setup lang="ts">
import Footer from '@/components/footer/Footer.vue';
import Header from '@/components/header/Header.vue';
import { useAuthStore } from '@/stores/authStore.ts';
import { computed, provide } from 'vue';

const authStore = useAuthStore();

authStore.checkAuth();

const auth = computed(() => authStore.isAuth);
provide('auth', auth);
</script>

<style lang="scss">
@use '@/assets/styles/main' as *;
@use '@/assets/styles/overrides' as *;

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
}

.content-wrapper {
    max-width: 900px;
    margin: 0 auto;
}
</style>
