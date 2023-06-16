module.exports = {
    displayName: 'vue-lib',
    preset: '../../jest.preset.js',
    transform: {
        '^.+.vue$': '@vue/vue3-jest',
        '.+.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+.tsx?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'vue', 'js', 'json'],
    coverageDirectory: '../../coverage/packages/vue-lib',
    snapshotSerializers: ['jest-serializer-vue'],
    globals: {
        'ts-jest': {
            tsconfig: 'packages/vue-lib/tsconfig.spec.json'
        },
        'vue-jest': {
            tsConfig: 'packages/vue-lib/tsconfig.spec.json'
        }
    }
}
