<template>
    <section class="preferences">
        <div class="preferences__wrapper content-wrapper">
            <h2 class="preferences__title subtitle" />
            <FormCardsList
                :questions="qs"
                @complete="submitQuestion"
            />
        </div>
        <p />
    </section>
</template>

<script setup lang="ts">
import FormCardsList from '@/components/FormCardsList.vue';
import type { Question } from '@/types/preference.ts';
import { usePreferenceStore } from '@/stores/preferenceStore.ts';

const preference = usePreferenceStore();

const qs: Question[] = [
    { type: 'input', title: 'rrr', description: 'ffff', id: '2345' },
    { type: 'input', title: 'rrr', description: 'ffff', id: '2445' },
];

const submitQuestion = (): void => {
    console.log(preference.state.answers);
};
</script>

<style scoped></style>
