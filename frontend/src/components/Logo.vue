<template>
    <div class="logo">
        <img
            class="logo__img"
            :class="`logo__img--${props.size}`"
            src="@/assets/img/logo.jpeg"
            height="30"
            width="30"
            alt="Логотип."
        />
        <p class="logo__text">THE<br />VIBEBOOK</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    size: 'xs' | 's' | 'm' | 'l';
}>();
</script>

<style scoped lang="scss">
.logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo__img {
    &--xs {
        width: 50px;
        height: 30px;
    }

    &--s {
        width: 80px;
        height: 50px;
    }

    &--m {
        width: 100px;
        height: 80px;
    }

    &--l {
        width: 200px;
        height: 150px;
    }
}

.logo__text {
    text-align: center;
    letter-spacing: 7px;
}
</style>
