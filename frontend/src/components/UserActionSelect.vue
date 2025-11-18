<template>
    <div class="user-actions">
        <v-select
            class="select"
            :items="options"
            label="Выбрать"
            hide-details
            single-line
            variant="outlined"
            :menu-props="{ class: 'my-select-menu' }"
            density="compact"
            @input="handleSelect"
        />
        <v-btn
            class="primary-button user-actions__button"
            rounded="0"
            size="small"
        >
            <template #append>
                <p class="user-actions__button-img">&oplus;</p>
            </template>
            Добавить в очередь
        </v-btn>
    </div>
</template>

<script setup lang="ts">
import { STATUS_BOOK } from '@/consts/statusBook.ts';

const emit = defineEmits<{
    (e: 'onselect', status: string): void;
}>();

const options = Object.values(STATUS_BOOK);

const handleSelect = (e) => {
    emit('onselect', e);
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
}

.user-actions__button-img {
    font-size: 20px;
    line-height: 20px;
    color: $light-color;

    padding: 0 0 2px;
}
</style>
