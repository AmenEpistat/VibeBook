/// <reference types="vite/client" />
declare module '@vueuse/motion';

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
