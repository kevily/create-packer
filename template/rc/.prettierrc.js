// 配置文档: https://prettier.io/docs/en/options.html
// ----------------------------------------------------------------------
module.exports = {
    overrides: [
        {
            files: '.prettierrc',
            options: { parser: 'json' },
        },
    ],
    printWidth: 100, // 一行的最大宽度
    tabWidth: 4, // 缩进
    useTabs: false, // 是否使用制表符
    semi: false, // 是否需要分号
    singleQuote: true, // 是否使用单引号
    trailingComma: 'none', // 是否尽量在代码尾部加逗号 <none|es5|all>
    bracketSpacing: true, // 是否在文字和对象括号之间留空格
    jsxBracketSameLine: true, // 是否将react标签的">"放在最后一行的末尾
    arrowParens: 'avoid', // 当箭头函数只有一个参数的时候是否需要括号包起来 <avoid（不需要）|always（需要）>
    rangeStart: 0, // 需要格式化的起点行数
    Parser: 'none', // 使用某种风格
}
