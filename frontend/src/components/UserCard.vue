<template>
    <article class="user-card">
        <h3 class="user-card__name">{{ user.username }}</h3>
        <p class="user-card__email">{{ user.email }}</p>
        <p class="user-card__role">{{ user.roles?.[0] }}</p>
        <AdminAction
            @edit="makeAdmin"
            @delete="() => {}"
        />
    </article>
</template>

<script setup lang="ts">
import type { IAuth } from '@/types/auth.ts';
import AdminAction from '@/components/AdminAction.vue';

const props = defineProps<{
    user: IAuth;
}>();
const emit = defineEmits(['make-admin', 'delete']);

const makeAdmin = () => {
    emit('make-admin', props.user._id);
};
</script>

<style scoped lang="scss"></style>
