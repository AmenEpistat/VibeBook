import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import 'vuetify/styles';

import '@mdi/font/css/materialdesignicons.css';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { MotionPlugin } from '@vueuse/motion';
import { loadSlim } from '@tsparticles/slim';
import Particles from '@tsparticles/vue3';
import { setupGuards } from '@/router/guards.ts';

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: { mdi },
    },
});

const app = createApp(App);

app.use(createPinia());
setupGuards(router);
app.use(router);
app.use(vuetify);

app.use(MotionPlugin);
app.use(Particles, {
    init: async (engine: any) => {
        await loadSlim(engine);
    },
});

app.mount('#app');
