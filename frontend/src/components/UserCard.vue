<template>
    <article class="user-card">
        <h3 class="user-card__name">{{ user.username }}</h3>
        <p class="user-card__email">{{ user.email }}</p>
        <p class="user-card__role">{{ user.roles?.[0] }}</p>
        <AdminAction
            :item-id="user.id"
            @edit="editUser"
            @delete="deleteUser"
        />
    </article>
</template>

<script setup lang="ts">
import type { User } from '@/types/auth.ts';
import AdminAction from '@/components/AdminAction.vue';

const props = defineProps<{
    user: User;
}>();
const emit = defineEmits(['edit-user', 'delete-user']);

const editUser = (id: string) => {
    emit('edit-user', id);
};

const deleteUser = (id: string) => {
    emit('delete-user', id);
};
</script>

<style scoped lang="scss"></style>
