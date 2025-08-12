import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config({
    extends: [eslint.configs.recommended, tseslint.configs.recommended],
    files: ['**/*.{tsx,ts}'],
    ignores: ['**/node_modules/', 'dist/', '.history/', '.vscode'],
    languageOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        globals: {
            ...globals.browser,
            ...globals.node
        }
    },
    rules: {
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 1,
        '@typescript-eslint/no-inferrable-types': [
            'warn',
            {
                ignoreParameters: true
            }
        ],
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/member-delimiter-style': 0,
        '@typescript-eslint/class-name-casing': 0,
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        semi: ['error', 'never'],
        quotes: 'off'
    }
})
