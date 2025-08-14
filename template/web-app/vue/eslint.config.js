import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import pluginVue from 'eslint-plugin-vue'

const scriptExtensions = ['js', 'jsx', 'mjs', 'cjs', 'ts', 'tsx']
const files = [...scriptExtensions.map(ext => `**/*.${ext}`), '**/*.vue']

export default tseslint.config([
    {
        ignores: [
            '**/node_modules/',
            'dist/',
            '.history/',
            '.vscode',
            'vite.config.ts.*',
            'mockUtils.ts'
        ]
    },
    eslint.configs.recommended,
    importPlugin.flatConfigs.recommended,
    tseslint.configs.recommended,
    pluginVue.configs['flat/recommended'],
    {
        files,
        languageOptions: {
            ecmaVersion: 2018,
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                },
                useJSXTextNode: true,
                parser: tseslint.parser
            },
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        settings: {
            'import/resolver': {
                typescript: true,
                node: true
            }
        },
        rules: {
            'import/export': 'off',
            'import/namespace': 'off',
            'import/default': 'off',
            'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
            'import/no-duplicates': ['error', { 'prefer-inline': true }],
            'import/no-named-as-default-member': 'off',
            'import/no-named-as-default': 'off',
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'object',
                        'type'
                    ],
                    pathGroups: [
                        { pattern: 'vue', group: 'external', position: 'before' },
                        { pattern: 'vue-router', group: 'external', position: 'before' }
                    ],
                    pathGroupsExcludedImportTypes: ['builtin']
                }
            ],
            'no-case-declarations': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-var-requires': 0,
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 0,
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-inferrable-types': [
                'warn',
                {
                    ignoreParameters: true
                }
            ],
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_'
                }
            ],
            '@typescript-eslint/member-delimiter-style': 0,
            '@typescript-eslint/class-name-casing': 0,
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-empty-interface': 'off',
            '@typescript-eslint/triple-slash-reference': 'off',
            'vue/multi-word-component-names': 0,
            'vue/html-indent': ['error', 4],
            'vue/require-default-prop': 'off',
            'vue/one-component-per-file': 'off',
            'vue/no-dupe-keys': 'off',
            'vue/html-self-closing': [
                'error',
                {
                    html: {
                        void: 'always',
                        normal: 'always',
                        component: 'always'
                    },
                    svg: 'always',
                    math: 'always'
                }
            ],
            'vue/max-attributes-per-line': 'off',
            'vue/singleline-html-element-content-newline': 'off',
            'no-constant-condition': 'off'
        }
    }
])
