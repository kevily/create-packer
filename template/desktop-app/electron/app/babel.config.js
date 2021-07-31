module.exports = {
    presets: [
        '@babel/typescript',
        [
            '@babel/env',
            {
                targets: {
                    chrome: '79',
                },
            },
        ],
    ],
    plugins: [
        'lodash',
        '@babel/plugin-transform-typescript',
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread',
    ],
}
