<template>
    <Header v-if="auth" />
    <router-view />
    <Footer />
    <ErrorModal
        v-model="errorStore.isVisible"
        :error="errorStore.message"
    />
</template>

<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import { useAuthStore } from '@/stores/authStore.ts';
import { computed, provide } from 'vue';
import { useErrorStore } from '@/stores/errorStore';
import ErrorModal from '@/components/ErrorModal.vue';

const errorStore = useErrorStore();
const authStore = useAuthStore();

authStore.checkAuth();

const auth = computed(() => authStore.isAuth);
provide('auth', auth);
</script>

<style lang="scss">
@use '@/assets/styles/main' as *;
@use '@/assets/styles/overrides' as *;
</style>
