<template>
    <v-dialog
        :model-value="modelValue"
        max-width="400"
        persistent
        transition="dialog-bottom-transition"
        @update:model-value="emit('update:modelValue', $event)"
    >
        <v-card>
            <v-card-title class="text-h6 text-center"> Ошибка </v-card-title>

            <v-card-text class="text-center">
                {{ error }}
            </v-card-text>

            <v-card-actions class="justify-center">
                <v-btn
                    color="primary"
                    rounded="xs"
                    @click="close"
                >
                    Понятно
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
    modelValue: boolean;
    error: string;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

function close() {
    emit('update:modelValue', false);
}
</script>
