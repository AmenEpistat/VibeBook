<template>
    <nav v-if="!isLogin">
        <img
            src=""
            height="30"
            width="30"
            alt="Логотип."
        />
    </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const isLogin = computed(() => localStorage.getItem('token'));
</script>

<style scoped></style>
