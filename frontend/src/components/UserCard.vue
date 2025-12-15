<template>
    <article class="user-card">
        <h3 class="user-card__name">{{ user.username }}</h3>
        <p class="user-card__email">{{ user.email }}</p>
        <p class="user-card__role">{{ user.roles?.[0] }}</p>
        <AdminAction
            :item-id="user.id"
            @edit="makeAdmin"
            @delete="() => {}"
        />
    </article>
</template>

<script setup lang="ts">
import type { User } from '@/types/auth.ts';
import AdminAction from '@/components/AdminAction.vue';

const props = defineProps<{
    user: User;
}>();
const emit = defineEmits(['make-admin', 'delete']);

const makeAdmin = (id: string) => {
    emit('make-admin', id);
};
</script>

<style scoped lang="scss"></style>
