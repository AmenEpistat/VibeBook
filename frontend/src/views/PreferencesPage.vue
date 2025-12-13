<template>
    <section class="preferences">
        <div class="preferences__wrapper content-wrapper">
            <h2 class="preferences__title subtitle" />
            <PreferenceCardsList
                :questions="qs"
                @complete="submitQuestion"
            />
        </div>
        <p />
    </section>
</template>

<script setup lang="ts">
import PreferenceCardsList from '@/components/PreferenceCardsList.vue';
import type { Question } from '@/types/preference.ts';
import { usePreferenceStore } from '@/stores/preferenceStore.ts';
import { onMounted, ref } from 'vue';

const preferenceStore = usePreferenceStore();

const qs = ref<Question[]>([]);

const submitQuestion = async () => {
    console.log(preferenceStore.state.answers);
};

onMounted(async () => {
    qs.value = await preferenceStore.getQuestions();
});
</script>

<style scoped></style>
