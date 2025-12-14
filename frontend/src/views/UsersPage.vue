<template>
    <div class="users-page content-wrapper">
        <h2 class="users-page__title subtitle">Пользователи</h2>
        <ul class="users-page__list">
            <li
                v-for="user in users"
                :key="user._id"
                class="users-page__item"
            >
                <UserCard
                    :user="user"
                    @make-admin="makeAdmin"
                    @delete="() => {}"
                />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { IAuth } from '@/types/auth.ts';
import UserCard from '@/components/UserCard.vue';
import { useAdminStore } from '@/stores/adminStore.ts';

const users = ref<IAuth[]>([]);

const adminStore = useAdminStore();

const makeAdmin = async (id: string) => {
    await adminStore.makeAdmin(id);
    users.value = await adminStore.getUsers();
};

onMounted(async () => {
    users.value = await adminStore.getUsers();
});
</script>

<style scoped lang="scss"></style>
