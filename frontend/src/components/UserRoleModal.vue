<template>
    <v-dialog
        v-model="isActive"
        max-width="400"
    >
        <v-card
            v-if="user"
            class="user-role-modal"
        >
            <h3 class="user-role-modal__title">Управление ролью</h3>
            <p class="user-role-modal__description">
                Имя пользователя: <span class="user-role-modal__role">{{ user.username }}</span>
            </p>
            <p class="user-role-modal__description">
                Почта пользователя: <span class="user-role-modal__role">{{ user.email }}</span>
            </p>
            <p class="user-role-modal__description">
                Текущая роль: <span class="user-role-modal__role">{{ isAdmin ? 'ADMIN' : 'USER' }}</span>
            </p>

            <v-card-actions>
                <v-spacer />

                <v-btn
                    variant="text"
                    @click="close"
                >
                    Отмена
                </v-btn>

                <v-btn
                    class="primary-button"
                    @click="toggleRole"
                >
                    {{ isAdmin ? 'Убрать админку' : 'Сделать админом' }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { ROLE, type User } from '@/types/auth';
import { useAdminStore } from '@/stores/adminStore';

const props = defineProps<{
    modelValue: boolean;
    user: User;
}>();

const emit = defineEmits(['update:modelValue', 'updated']);

const adminStore = useAdminStore();

const isActive = ref(props.modelValue);

watch(
    () => props.modelValue,
    (v) => (isActive.value = v),
);

watch(isActive, (v) => emit('update:modelValue', v));

const isAdmin = computed(() => props.user?.roles?.includes(ROLE.ADMIN));

const close = () => {
    isActive.value = false;
};

const toggleRole = async () => {
    if (isAdmin.value) {
        await adminStore.deleteAdmin(props.user.id);
    } else {
        await adminStore.makeAdmin(props.user.id);
    }

    emit('updated');
    close();
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.user-role-modal {
    padding: 16px;
}

.user-role-modal__title {
    margin-bottom: 16px;
}

.user-role-modal__description {
    margin-bottom: 8px;

    &:last-of-type {
        margin-bottom: 16px;
    }
}

.user-role-modal__role {
    font-weight: 600;
    font-size: 18px;
    color: $primary-color;
}
</style>
