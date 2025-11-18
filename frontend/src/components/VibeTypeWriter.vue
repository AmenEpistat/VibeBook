<template>
    <p ref="textRef" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Typewriter from 'typewriter-effect/dist/core';

const props = defineProps<{
    text: string;
    delay: number;
    deleteAll: boolean;
}>();

const textRef = ref<HTMLParagraphElement | null>(null);

onMounted(() => {
    if (!textRef.value) return;

    const typewriter = new Typewriter(textRef.value, {
        loop: props.deleteAll,
        delay: props.delay,
    });

    let chain = typewriter.typeString(props.text).pauseFor(800);

    if (props.deleteAll) {
        chain = chain.deleteAll();
    }

    chain.start();
});
</script>
