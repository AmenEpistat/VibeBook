<template>
    <div class="author-card">
        <p class="authors-page__name">{{ author.name }} {{ author.surname }}</p>
    </div>
</template>

<script setup lang="ts">
import type { Author } from '@/types/author.ts';

const props = defineProps<{
    author: Author;
}>();
</script>

<style scoped lang="scss"></style>
