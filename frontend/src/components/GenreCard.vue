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

<style scoped lang="scss"></style>
