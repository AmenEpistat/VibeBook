import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import { globalIgnores } from 'eslint/config';
import pluginPrettier from 'eslint-plugin-prettier';

export default defineConfigWithVueTs(
    pluginVue.configs['flat/recommended'],
    vueTsConfigs.recommended,
    skipFormatting,
    globalIgnores(['**/dist/**', '**/coverage/**']),
    {
        name: 'app/files-to-lint',
        files: ['**/*.{ts,js,vue}'],
        plugins: { prettier: pluginPrettier },
        rules: {
            'vue/multi-word-component-names': 'off',
            'vue/valid-template-root': 'off',
            'vue/html-self-closing': [
                'error',
                {
                    html: { void: 'always', normal: 'always', component: 'always' },
                    svg: 'always',
                    math: 'always',
                },
            ],
            'prettier/prettier': [
                'error',
                {
                    semi: true,
                    singleQuote: true,
                    printWidth: 120,
                    trailingComma: 'all',
                    bracketSameLine: false,
                    vueIndentScriptAndStyle: false,
                    singleAttributePerLine: true,
                },
            ],
        },
    },
);
