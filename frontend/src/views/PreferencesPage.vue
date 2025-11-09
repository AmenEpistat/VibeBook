<template>
    <section class="preferences">
        <div class="preferences__wrapper container">
            <h2 class="preferences__title subtitle">Reading Preferences</h2>
            <form-cards-list :questions="qs" />
        </div>
        <p />
    </section>
</template>

<script setup lang="ts">
import FormCardsList from '@/components/FormCardsList.vue';
import type { IQuestion } from '@/components/FormCard.vue';

const qs: IQuestion[] = [
    { type: 'input', title: 'rrr', description: 'ffff' },
    { type: 'input', title: 'rrr', description: 'ffff' },
];
</script>

<style scoped></style>
