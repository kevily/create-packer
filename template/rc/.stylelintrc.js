module.exports = {
    extends: 'stylelint-config-standard',
    rules: {
        indentation: 4,
        'comment-empty-line-before': 'never',
        'no-empty-source': null,
        'no-descending-specificity': null,
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['function', 'if', 'each', 'include', 'mixin', 'extend']
            }
        ],
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global']
            }
        ]
    }
}
