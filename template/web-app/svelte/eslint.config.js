import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import svelte from 'eslint-plugin-svelte'

const scriptExtensions = ['js', 'jsx', 'mjs', 'cjs', 'ts', 'tsx']
const files = [...scriptExtensions.map(ext => `**/*.${ext}`), '**/*.svelte']

export default tseslint.config([
    {
        ignores: [
            '**/node_modules/',
            '**/dist/',
            '**/.history/',
            '**/.vscode/',
            '**/.svelte-kit/',
            'vite.config.ts.*'
        ]
    },
    eslint.configs.recommended,
    importPlugin.flatConfigs.recommended,
    tseslint.configs.recommended,
    ...svelte.configs['flat/recommended'],
    ...svelte.configs['flat/prettier'],
    {
        files,
        languageOptions: {
            ecmaVersion: 2018,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node
            },
            parserOptions: {
                parser: tseslint.parser
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
                    pathGroups: [{ pattern: 'svelte', group: 'external', position: 'before' }],
                    pathGroupsExcludedImportTypes: ['svelte']
                }
            ],
            'no-case-declarations': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-var-requires': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
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
            '@typescript-eslint/member-delimiter-style': 'off',
            '@typescript-eslint/class-name-casing': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-empty-interface': 'off',
            '@typescript-eslint/triple-slash-reference': 'off',
            'no-constant-condition': 'off'
        }
    }
])
