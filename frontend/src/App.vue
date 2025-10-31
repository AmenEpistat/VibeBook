<template>
    <Header />
    <router-view />
    <Footer />
</template>

<script setup lang="ts">
import Footer from '@/components/footer/Footer.vue';
import Header from '@/components/header/Header.vue';
</script>

<style lang="scss">
@use '@/assets/styles/main' as *;
@use '@/assets/styles/overrides' as *;

.container {
    max-width: 1400px;
    margin: 0 auto;
}
</style>
