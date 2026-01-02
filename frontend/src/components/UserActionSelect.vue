<template>
    <div class="user-actions">
        <v-select
            class="select"
            :items="options"
            item-title="title"
            item-value="value"
            label="Выбрать"
            hide-details
            single-line
            variant="outlined"
            :menu-props="{ class: 'my-select-menu' }"
            density="compact"
            @update:model-value="handleSelect"
        />
        <v-btn
            class="primary-button user-actions__button"
            rounded="0"
            size="small"
            @click="appendQueue"
        >
            <template #append>
                <p class="user-actions__button-img">&oplus;</p>
            </template>
            {{ statusStateValue?.isQueue ? 'В очереди' : 'Добавить в очередь' }}
        </v-btn>
        <v-btn
            class="user-actions__button"
            rounded="0"
            size="small"
            variant="outlined"
            elevation="0"
            @click="appendFav"
        >
            <template #append>
                <p class="user-actions__button-img">&#10025;</p>
            </template>
            {{ !statusStateValue?.isFavorite ? 'Добавить в избранное' : 'В избранном' }}
        </v-btn>
    </div>
</template>

<script setup lang="ts">
import { STATUS_BOOK, type StatusBook } from '@/consts/statusBook.ts';
import { ref, watch } from 'vue';
import type { UserStatusBook } from '@/types/user.ts';

const props = defineProps<{
    statusState?: UserStatusBook;
}>();
const emit = defineEmits<{
    (e: 'select-status', status: StatusBook): void;
    (e: 'append-fav'): void;
    (e: 'append-queue'): void;
}>();

const statusStateValue = ref<UserStatusBook>(props.statusState);

watch(
    () => props.statusState,
    (v) => (statusStateValue.value = v),
);

const options = Object.entries(STATUS_BOOK).map(([key, label]) => ({
    title: label,
    value: key as StatusBook,
}));

const handleSelect = (status: StatusBook) => {
    console.log(status);
    emit('select-status', status);
};

const appendFav = () => {
    emit('append-fav');
};

const appendQueue = () => {
    emit('append-queue');
};
</script>

<style lang="scss">
@use '@/assets/styles/variables' as *;

.user-actions {
    display: flex;
    flex-direction: column;
    gap: 0;
    justify-content: flex-start;

    .v-field {
        border-radius: 0 !important;
    }

    .v-btn--variant-outlined {
        background: $light-border-color;
        color: $additional-color;
        border: 1px solid $light-border-color;
    }
}

.user-actions__button {
    &:last-of-type {
        margin-top: 30px;
    }
}

.user-actions__button-img {
    font-size: 20px;
    line-height: 20px;

    padding: 0 0 2px;
}
</style>
