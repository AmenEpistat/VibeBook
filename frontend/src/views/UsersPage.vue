<template>
    <div class="users-page content-wrapper">
        <h2 class="users-page__title subtitle">Пользователи</h2>
        <ul class="users-page__list">
            <li
                v-for="user in users"
                :key="user.id"
                class="users-page__item"
            >
                <UserCard
                    :user="user"
                    @delete-user="deleteUser"
                    @edit-user="openModal"
                />
                <UserRoleModal
                    v-model="isModalOpen"
                    :user="user"
                    @updated="refreshUsers"
                />
            </li>
        </ul>
    </div>
    <Loader v-if="isLoading" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import UserCard from '@/components/UserCard.vue';
import { useAdminStore } from '@/stores/adminStore.ts';
import type { User } from '@/types/auth.ts';
import UserRoleModal from '@/components/UserRoleModal.vue';
import Loader from '@/components/Loader.vue';

const users = ref<User[]>([]);

const isModalOpen = ref(false);

const adminStore = useAdminStore();

const isLoading = computed(() => adminStore.isLoading);

const refreshUsers = async () => {
    users.value = await adminStore.getUsers();
};

const deleteUser = async (id: string) => {
    await adminStore.deleteUser(id);
    await refreshUsers();
};

const openModal = () => {
    isModalOpen.value = true;
};

onMounted(async () => {
    await refreshUsers();
});
</script>

<style scoped lang="scss"></style>
