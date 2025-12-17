<template>
    <div class="genre-card">
        <p class="genres-page__name">{{ genre.name }}</p>
    </div>
</template>

<script setup lang="ts">
import type { Genre } from '@/types/genre.ts';

const props = defineProps<{
    genre: Genre;
}>();
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.genre-card {
    padding: 16px;

    border-radius: 16px;
    border: 1px solid $light-border-color;
}

.genres-page__name {
    display: flex;
    gap: 16px;
    align-items: center;

    &::before {
        content: '';

        display: block;

        width: 16px;
        height: 16px;

        background-color: $primary-color;
        border-radius: 50%;
    }
}
</style>
