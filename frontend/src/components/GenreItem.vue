<template>
    <div class="genre-item">
        {{ name }}
    </div>
</template>

<script setup lang="ts">
import type { Genre } from '@/types/genre.ts';

const props = defineProps<Genre>();
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.genre-item {
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    max-width: 150px;
    width: fit-content;
    height: 25px;
    padding: 2px 8px;

    font-size: 12px;

    border: 1px solid $light-border-color;
    border-right: none;
    border-radius: 2px;

    &::before {
        content: '';
        display: block;

        position: absolute;
        top: 0;
        right: -6px;

        width: 1px;
        height: 13px;

        transform: skewX(40deg);

        background-color: $light-border-color;
    }

    &::after {
        position: absolute;
        bottom: 0;
        right: -6px;

        content: '';
        display: block;

        width: 1px;
        height: 13px;

        transform: skewX(-40deg);

        background-color: $light-border-color;
    }
}
</style>
