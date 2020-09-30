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
        '@babel/plugin-syntax-dynamic-import',
        [
            'import',
            {
                libraryName: 'antd',
                libraryDirectory: 'lib',
                style: true
            }
        ],
        [
            'react-css-modules',
            {
                filetypes: {
                    '.module.less': {
                        syntax: 'postcss-less'
                    },
                    '.module.scss': {
                        syntax: 'postcss-scss'
                    }
                },
                generateScopedName: config.scopeClassName
            }
        ]
    ]
}
if (process.env.NODE_ENV === 'production') {
    baseConfig.plugins.push(
        'lodash',
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
