<template>
    <section class="promo">
        <div class="promo__text-wrapper">
            <h1 class="promo__title">
                <span>The <br /></span> VibeBook
            </h1>
            <p class="promo__description">Because life's too short for a book you're not in the mood for.</p>
        </div>
        <div class="promo__img-wrapper">
            <img
                class="promo__img"
                src="@/assets/img/promoBackground.jpg"
                alt=""
            />
        </div>
        <div class="promo__sign-buttons-wrapper">
            <v-btn
                rounded="lg"
                class="primary-button"
            >
                Войти
            </v-btn>
            <v-btn
                rounded="lg"
                variant="plain"
            >
                Зарегистрироваться
            </v-btn>
        </div>
    </section>
    <section class="features">
        <p class="features__text">
            Мы поможем выбрать следующую книгу, опираясь на <b>ваши интересы</b> и настроение.<br />Давай
            <b>искусственный интеллект</b> сделает это.
        </p>
        <ul class="features__list">
            <Motion
                v-motion
                :initial="{ opacity: 0, y: 100 }"
                :visible="{ opacity: 1, y: 0 }"
                tag="li"
                class="features__item"
            >
                <div class="features__text-wrapper">
                    <h2 class="features__title">Discover books by mood</h2>
                    <p class="features__description">
                        Вам хочется чего-нибудь авантюрного, веселого и динамичного? Как насчет более мрачного,
                        медленного и эмоционального чтения?
                        <br />
                        Комбинируйте <b>наш обширный набор фильтров</b>, чтобы выбрать свою следующую идеальную книгу.
                    </p>
                </div>
                <img
                    class="features__img"
                    src="@/assets/img/featureMoods.png"
                    width="1995"
                    height="628"
                    alt=""
                    loading="lazy"
                />
            </Motion>
            <Motion
                v-motion
                tag="li"
                class="features__item"
                :initial="{ opacity: 0, y: 100 }"
                :visible="{ opacity: 1, y: 0 }"
            >
                <img
                    class="features__img"
                    src="@/assets/img/featureRecommendations.png"
                    width="2323"
                    height="628"
                    alt=""
                    loading="lazy"
                />
                <Motion
                    v-motion
                    tag="div"
                    :initial="{ opacity: 0, y: 100 }"
                    :visible="{ opacity: 1, y: 0 }"
                    :transition="{ delay: 3, duration: 1 }"
                    class="features__text-wrapper"
                >
                    <h2 class="features__title">Get smart personalised recommendations</h2>
                    <p class="features__description">
                        Наш <b>искусственный интеллект</b> с машинным обучением - это ваш надежный друг, к которому
                        можно обратиться за рекомендациями по книгам.
                        <br />
                        Он поймет ваши предпочтения в чтении и <b>подберет для вас лучшие книги</b>.
                    </p>
                </Motion>
            </Motion>
        </ul>
    </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.promo {
    position: relative;
    z-index: 1;

    min-height: 700px;
    padding: 0 100px;

    overflow: hidden;

    &::before {
        content: '';

        position: absolute;
        bottom: 0;
        left: 0;
        z-index: -1;

        width: 100%;
        height: 100%;
        min-height: 800px;

        background-color: $primary-color;
        background-position: center;
    }
}

.promo__text-wrapper {
    max-width: 480px;

    padding-top: 180px;
}

.promo__title {
    margin-bottom: 24px;

    font-size: 60px;
    font-weight: 700;
    line-height: 60px;
    color: $light-color;

    span {
        font-size: 18px;
        line-height: 28px;
    }
}

.promo__description {
    margin-bottom: 24px;

    font-size: 36px;
    font-weight: 500;
    color: $light-color;
    line-height: 40px;
}

.promo__img-wrapper::before {
    content: '';

    position: absolute;
    bottom: 0;
    left: 650px;
    z-index: 2;

    width: 60%;
    min-height: 800px;

    background-color: rgba($primary-color, 0.3);
    background-position: right;
}

.promo__img {
    position: absolute;
    bottom: 0;
    left: 650px;
}

.features__text {
    max-width: 600px;
    margin: 100px auto;

    text-align: center;
    font-size: 24px;
    line-height: 32px;
}

.features__item {
    position: relative;

    display: flex;
    align-items: center;

    min-height: 800px;
    margin-bottom: 70px;

    overflow: hidden;

    &:first-child {
        .features__img {
            left: unset;
            right: -50%;
        }
    }
}

.features__text-wrapper {
    padding: 60px;
    max-width: 600px;

    &:last-child {
        margin-left: auto;
    }
}

.features__title {
    position: relative;

    font-size: 33px;
    line-height: 36px;

    margin-bottom: 30px;

    &::before {
        content: '✧';
        width: 46px;
        height: 46px;

        position: absolute;
        top: -70px;

        display: flex;
        align-items: center;
        justify-content: center;

        color: $light-color;

        background: $primary-color;
        border-radius: 6px;
    }
}

.features__description {
    font-size: 20px;
    line-height: 28px;
}

.features__img {
    position: absolute;
    top: 0;
    left: -45%;

    box-shadow:
        rgb(255, 255, 255) 0 0 0 0,
        rgba(0, 0, 0, 0.05) 0 0 0 1px,
        rgba(0, 0, 0, 0.1) 0 20px 25px -5px,
        rgba(0, 0, 0, 0.1) 0 8px 10px -6px;
    border-radius: 20px;
}
</style>
