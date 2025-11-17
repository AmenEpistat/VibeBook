<template>
    <div
        class="genre-item"
        :class="color"
    >
        {{ name }}
    </div>
</template>

<script setup lang="ts">
import type { Genre } from '@/types/genre.ts';
import { computed } from 'vue';

const color = computed(() => `genre-item--${Math.floor(Math.random() * (3 - 1 + 1))}`);

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
        height: 12px;

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
        height: 12px;

        transform: skewX(-40deg);

        background-color: $light-border-color;
    }

    &--0 {
        color: $primary-color;
    }

    &--1 {
        color: $additional-bg-color;
    }

    &--2 {
        color: $secondary-bg-color;
    }
}
</style>
