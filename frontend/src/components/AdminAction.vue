<template>
    <div class="admin-action">
        <v-btn @click="editItem">
            <v-icon left>mdi-pencil</v-icon>
        </v-btn>

        <v-btn @click="deleteItem">
            <v-icon left>mdi-delete</v-icon>
        </v-btn>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    itemId: string;
}>();

const emit = defineEmits(['edit', 'delete']);

const editItem = () => {
    emit('edit', props.itemId);
};

const deleteItem = () => {
    emit('delete', props.itemId);
};
</script>

<style scoped lang="scss"></style>
