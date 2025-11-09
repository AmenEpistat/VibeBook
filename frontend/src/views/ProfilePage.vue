<template>
    <h1>{{ authStore.user.username }}</h1>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore.ts';

const authStore = useAuthStore();
</script>

<style scoped></style>
