<template>
    <div class="profile container">
        <v-avatar
            size="100"
            class="user-avatar"
        >
            <v-icon
                color="cyan-darken-2"
                size="140"
            >
                mdi-account-circle
            </v-icon>
        </v-avatar>
        <div class="profile__info-wrapper">
            <h1 class="profile__title">@{{ authStore.user.username }}</h1>
            <v-btn
                variant="text"
                @click="editProfile"
            >
                <v-icon
                    size="30"
                    left
                    >mdi-pencil</v-icon
                >
            </v-btn>
            <p class="profile__email">{{ authStore.user.email }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore.ts';

const authStore = useAuthStore();
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.profile {
    display: grid;
    grid-template-columns: auto 2fr 1fr;
    column-gap: 24px;
}

.profile__title {
    color: $primary-color;
}

.profile__info-wrapper {
    display: grid;
    grid-template-columns: min-content min-content;
    align-items: center;
}

.profile__icon {
    width: 240px;
    height: 240px;
}
</style>
