const config = require('./webpack_config/config')

const baseConfig = {
    presets: [
        '@babel/preset-typescript',
        '@babel/preset-react',
        [
            '@babel/preset-env',
            {
                targets: {
                    chrome: '58',
                    ie: '9',
                    ios: '9'
                }
            }
        ]
    ],
    plugins: [
        'transform-react-remove-prop-types',
        [
            'import',
            {
                libraryName: 'antd',
                libraryDirectory: 'lib',
                style: true
            }
        ]
    ]
}
if (process.env.NODE_ENV === 'production') {
    baseConfig.plugins.push(
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: 2
            }
        ],
        ['transform-remove-console', { exclude: ['error', 'warn'] }]
    )
}
module.exports = baseConfig
