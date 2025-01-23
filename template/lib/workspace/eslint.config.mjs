import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import storybook from 'eslint-plugin-storybook'

const scriptExtensions = ['js', 'jsx', 'mjs', 'cjs', 'ts', 'tsx']
const storybookFiles = scriptExtensions.map(ext => `**/*.stories.${ext}`)
const files = scriptExtensions.map(ext => `**/*.${ext}`)
const ignores = [
    '**/node_modules/',
    '**/dist/',
    '**/cjs/',
    '**/.history/',
    '**/storybook-static/',
    '**/.vscode/'
]

export default tseslint.config([
    { ignores },
    eslint.configs.recommended,
    importPlugin.flatConfigs.recommended,
    tseslint.configs.recommended,
    {
        plugins: {
            reactPlugin,
            reactHooksPlugin
        },
        files,
        languageOptions: {
            ecmaVersion: 2018,
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                },
                useJSXTextNode: true
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
            },
            react: {
                version: '18'
            }
        },
        rules: {
            'import/export': 'off',
            'import/namespace': 'off',
            'import/default': 'off',
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
                        { pattern: 'react', group: 'external', position: 'before' },
                        { pattern: 'react-dom/*', group: 'external', position: 'before' },
                        { pattern: 'react-router', group: 'external', position: 'before' },
                        { pattern: 'react-router-dom', group: 'external', position: 'before' }
                    ],
                    pathGroupsExcludedImportTypes: ['react', 'react-router', 'react-router-dom']
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
            'react/prop-types': 'off',
            'react/no-find-dom-node': 'off',
            'react-hooks/exhaustive-deps': 'off',
            'react/display-name': 'off',
            'react/react-in-jsx-scope': 'off',
            'no-constant-condition': 'off'
        }
    },
    { extends: [storybook.configs['flat/recommended']], files: storybookFiles }
])
