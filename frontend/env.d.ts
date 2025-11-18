/// <reference types="vite/client" />
declare module '@vueuse/motion';

declare module '@tsparticles/vue3';

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module 'typewriter-effect/dist/core' {
    const Typewriter: any;
    export default Typewriter;
}
