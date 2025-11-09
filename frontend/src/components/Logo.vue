<template>
    <div class="logo">
        <a href="/">
            <img
                class="logo__img"
                :class="`logo__img--${props.size}`"
                src="@/assets/img/logo.png"
                height="30"
                width="30"
                alt="Логотип."
            />
            <p
                v-if="isVisibleText"
                class="logo__text"
            >
                THE<br />VIBEBOOK
            </p>
        </a>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    size: 'xs' | 's' | 'm' | 'l';
    isVisibleText: boolean;
}>();
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.logo:has(a .logo__text) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo__img {
    &--xs {
        width: 50px;
        height: 40px;
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

.logo a {
    text-decoration: none;
    color: $dark-color;
}
</style>
