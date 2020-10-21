// 配置文档: https://prettier.io/docs/en/options.html
// ----------------------------------------------------------------------
module.exports = {
    overrides: [
        {
            files: '.prettierrc',
            options: { parser: 'json' }
        }
    ],
    printWidth: 100,
    tabWidth: 4,
    useTabs: false,
    semi: false,
    singleQuote: true,
    trailingComma: 'none',
    bracketSpacing: true,
    jsxBracketSameLine: true,
    arrowParens: 'always',
    rangeStart: 0
}
