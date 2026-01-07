<template>
    <div class="not-found content-wrapper">
        <v-btn
            class="primary-button"
            @click="router.push('/')"
            >На главную</v-btn
        >
        <img
            src="@/assets/img/404.jpg"
            alt="Неправильная ссылка"
            width="100"
            height="100"
            class="not-found__img"
        />
    </div>
</template>

<script setup lang="ts">
import router from '@/router/index.ts';
</script>

<style scoped lang="scss">
.not-found__img {
    width: 100%;
    height: 100%;
}
</style>
