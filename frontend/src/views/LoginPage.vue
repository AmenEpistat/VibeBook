<template>
    <section class="login container">
        <Logo
            size="l"
            is-visible-text
        />
        <form class="login__form">
            <v-text-field
                v-model="formData.email"
                label="Email"
                variant="outlined"
                :rules="[rules.required, rules.isEmail]"
            />
            <v-text-field
                v-if="!isRegister"
                v-model="formData.username"
                label="Имя пользователя"
                maxlength="30"
                variant="outlined"
                :rules="[rules.required]"
            />
            <v-text-field
                v-model="formData.password"
                label="Пароль"
                variant="outlined"
                :type="isVisiblePassword ? 'text' : 'password'"
                :rules="[rules.required, rules.minPassword]"
            >
                <template #append-inner>
                    <img
                        :src="imgSrc"
                        alt="Показать пароль."
                        width="24"
                        height="24"
                        class="login__form-img"
                        @click="togglePasswordVisibility"
                    />
                </template>
            </v-text-field>
            <v-text-field
                v-if="!isRegister"
                v-model="passwordConfirm"
                label="Повторите пароль"
                variant="outlined"
                :type="isVisiblePassword ? 'text' : 'password'"
                :rules="[rules.required, rules.passwordsMatch]"
            >
                <template #append-inner>
                    <img
                        :src="imgSrc"
                        alt="Показать пароль"
                        width="24"
                        height="24"
                        class="login__form-img"
                        @click="togglePasswordVisibility"
                    />
                </template>
            </v-text-field>
            <div class="login__buttons-wrapper">
                <v-btn
                    rounded="xs"
                    class="primary-button"
                    @click="onFormSubmit"
                >
                    {{ buttonPrimaryText }}
                </v-btn>
                <v-btn
                    rounded="xs"
                    class="login__button plain-button"
                    variant="plain"
                    @click="toggleRouterName"
                >
                    {{ buttonSecondaryText }}
                </v-btn>
            </div>
        </form>
        <v-dialog
            v-model="isErrorModalVisible"
            max-width="400"
            persistent
            transition="dialog-bottom-transition"
        >
            <v-card>
                <v-card-title class="text-h6 text-center"> Ошибка </v-card-title>

                <v-card-text class="text-center">
                    {{ authStore.errorMessage }}
                </v-card-text>

                <v-card-actions class="justify-center">
                    <v-btn
                        color="primary"
                        rounded="xs"
                        @click="authStore.errorMessage = ''"
                    >
                        извини меня, пожалуйста
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </section>
    <Loader v-if="isLoading" />
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import visibilityOn from '@/assets/icons/visibilityOn.svg';
import visibilityOff from '@/assets/icons/visibilityOff.svg';
import { useRoute, useRouter } from 'vue-router';
import type { IAuth } from '@/types/auth.ts';
import { useAuthStore } from '@/stores/authStore.ts';
import Logo from '@/components/Logo.vue';
import Loader from '@/components/Loader.vue';

const formData = reactive<IAuth>({
    email: '',
    password: '',
    username: '',
});
const passwordConfirm = ref('');

const isVisiblePassword = ref(false);

const route = useRoute();
const router = useRouter();

const isRegister = computed(() => route.name === 'sign-in');

const imgSrc = computed(() => (isVisiblePassword.value ? visibilityOn : visibilityOff));
const buttonPrimaryText = computed(() => (isRegister.value ? 'Войти' : 'Зарегистрироваться'));
const buttonSecondaryText = computed(() => (isRegister.value ? 'Аккаунта нет' : 'Уже есть аккаунт'));

const rules = {
    required: (v: string | null | undefined) => !!v || 'Поле обязательно для заполнения',
    isEmail: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Введите корректную почту',
    minPassword: (v: string) => v.length >= 5 || 'Не менее 5 символов для пароля',
    passwordsMatch: (v: string) => v === computed(() => formData.password).value || 'Пароли не совпадают',
};

const authStore = useAuthStore();

const isErrorModalVisible = computed(() => authStore.errorMessage.length > 0);
const isLoading = computed(() => authStore.isLoading);

const toggleRouterName = () => {
    router.push({ name: isRegister.value ? 'sign-up' : 'sign-in' });
};

const togglePasswordVisibility = () => {
    isVisiblePassword.value = !isVisiblePassword.value;
};

const onFormSubmit = async () => {
    const isValid = [
        rules.isEmail(formData.email),
        rules.minPassword(formData.password),
        rules.required(formData.password),
        !isRegister.value ? rules.required(formData.username) : true,
        !isRegister.value ? rules.required(passwordConfirm.value) : true,
        !isRegister.value ? rules.passwordsMatch(passwordConfirm.value) : true,
    ].every((r) => r === true);

    if (!isValid) {
        return;
    }

    if (!isRegister.value) {
        await authStore.registration(formData);
    } else {
        await authStore.login(formData);
    }
};

watch(
    () => authStore.isAuth,
    (value) => {
        if (value) router.push('/profile');
    },
);
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.login {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.login__form {
    display: flex;
    flex-direction: column;
    gap: 7px;

    width: clamp(300px, 50%, 500px);
    margin: 0 auto;
    padding: 60px 30px;

    border: 1px solid #ebebeb;
    border-radius: 10px;
    box-shadow:
        rgba(0, 0, 0, 0) 0 0 0 0,
        rgba(0, 0, 0, 0) 0 0 0 0,
        rgba(0, 0, 0, 0.05) 0 1px 2px 0;
}

.login__form-img {
    width: 24px;
    height: 24px;
}

.login__buttons-wrapper {
    display: grid;
    gap: 20px;

    .login__button {
        justify-self: end;
    }
}
</style>
