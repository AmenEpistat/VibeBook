<template>
    <nav class="nav">
        <div class="nav__wrapper container">
            <Logo
                size="xs"
                :is-visible-text="false"
            />
            <button
                class="header__toggle"
                :class="isOpen ? 'header__toggle--open' : ''"
                type="button"
                @click="openNavigation"
            />
            <ul
                class="nav__list"
                :class="isOpen ? '' : 'nav__list--closed'"
            >
                <li
                    v-for="(i, index) in links"
                    :key="index"
                    class="nav__item"
                >
                    <RouterLink
                        class="nav__link"
                        :to="i.href"
                    >
                        {{ i.title }}</RouterLink
                    >
                </li>
            </ul>
            <div class="nav__profile">
                <v-menu
                    offset-y
                    transition="fade-transition"
                >
                    <template #activator="{ props }">
                        <v-avatar
                            v-bind="props"
                            size="40"
                            class="user-avatar"
                        >
                            <img
                                src="../assets/img/user-placeholder.jpg"
                                alt="Профиль"
                            />
                        </v-avatar>
                    </template>
                    <v-list class="nav__profile-list">
                        <li
                            v-for="(i, index) in profileLinks"
                            :key="index"
                            class="nav__profile-item"
                        >
                            <RouterLink
                                class="nav__profile-link"
                                :to="i.href"
                            >
                                {{ i.title }}</RouterLink
                            >
                        </li>
                        <li class="nav__profile-item">
                            <button @click="logout">
                                Выйти
                                <img
                                    class="nav__profile-img"
                                    src="../assets/img/logout.svg"
                                    height="24"
                                    width="24"
                                    alt="Выйти."
                                />
                            </button>
                        </li>
                    </v-list>
                </v-menu>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import Logo from '@/components/Logo.vue';
import { useAuthStore } from '@/stores/authStore.ts';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

const isAdmin = computed(() => authStore.user.roles?.[0] ?? 'user');

const userLinks = [
    {
        title: 'Обо мне',
        href: '#about-me',
    },
    {
        title: 'Мои проекты',
        href: '#projects',
    },
    {
        title: 'Почему я',
        href: '#about-me',
    },
    {
        title: 'Обсудим',
        href: '#about-me',
    },
];

const adminLinks = [
    {
        title: 'Книги',
        href: '/books',
    },
    {
        title: 'Авторы',
        href: '#projects',
    },
    {
        title: 'Жанры',
        href: '#about-me',
    },
    {
        title: 'Пользователи',
        href: '#about-me',
    },
];

const profileLinks = [
    {
        title: 'Профиль',
        href: '/profile',
    },
    {
        title: 'Редактировать профиль',
        href: '#projects',
    },
    {
        title: 'Предпочтения',
        href: '#about-me',
    },
];

const links = computed(() => (!isAdmin.value ? userLinks : adminLinks));

const isOpen = ref(false);

const openNavigation = () => {
    isOpen.value = !isOpen.value;
};

const logout = async () => {
    await authStore.logout();
    await router.push('/');
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.nav {
    position: fixed;
    inset: 0;
    z-index: 1000;
    max-height: 80px;

    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(3px);
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);

    .container {
        padding-top: 10px;
    }
}

.nav::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;

    width: 100%;
    height: 100%;

    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);

    transition: all 1s ease;
}

.nav:hover::before {
    left: 100%;
}

.nav__wrapper {
    position: relative;
    display: grid;
    grid-template-columns: auto 2fr 1fr;
    justify-content: end;
    align-items: center;

    padding: 10px 0;
}

.nav__list {
    position: absolute;
    top: 50px;
    z-index: 1;
    width: 100%;
    display: flex;
    flex-direction: column;

    border-top: 1px solid $primary-color;

    @media (min-width: $tablet) {
        position: unset;
        flex-direction: row;
        background-color: transparent;
        border-top: none;
    }
}

.nav__list--closed {
    display: none;

    @media (min-width: $tablet) {
        display: flex;
    }
}

.nav__item {
    border-bottom: 1px solid $primary-color;

    @media (min-width: $tablet) {
        border: none;

        font-weight: 600;
    }
}

.nav__link {
    display: block;
    padding: 20px;
    font-size: 20px;
    line-height: 21px;
    text-align: center;

    @media (min-width: $tablet) {
        gap: 20px;
        text-decoration-line: underline;
        text-decoration-thickness: 3px;
        text-underline-offset: 20px;
        text-decoration-color: transparent;
        transition: all 0.2s ease;
    }
}

.nav__link:hover {
    color: $primary-color;

    @media (min-width: $tablet) {
        text-decoration-color: $dark-color;
    }
}

.header__toggle {
    display: block;
    width: 30px;
    height: 30px;
    margin-inline: auto 20px;

    background-color: #845747;
    mask-repeat: no-repeat;
    mask-position: center;
    border-radius: 0;
    border: 0;
    transition: transform 0.4s ease;

    &--open {
        transform: rotate(90deg);
    }

    @media (min-width: $tablet) {
        display: none;
    }
}

.nav__profile {
    margin-left: auto;
}

.nav__profile-item {
    list-style: none;
    padding: 8px 16px;

    text-align: right;
    font-size: 16px;
    transition: all 0.3s ease;

    &:hover {
        background-color: $primary-color;
        color: $light-color;
    }

    button {
        display: flex;
        align-items: center;
        gap: 10px;

        margin-left: auto;

        font-size: 16px;
    }
}

.v-list {
    padding: 0 !important;
}
</style>
