module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    //   'eslint:recommended',
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    // override/add rules settings here, such as:
    'indent': ['warn', 2],
    'vue/component-tags-order': ['warn', {
      'order': ['template', 'script', 'style']
    }],
    'vue/max-attributes-per-line': 'warn',
    'vue/no-unused-vars': ['warn', {
      'ignorePattern': '^_'
    }],
    'vue/no-unused-components': ['warn', {
      'ignoreWhenBindingPresent': true
    }],
    'vue/script-indent': ['warn', 2, { 
      'baseIndent': 1,
    }],
    'vue/html-indent': ['warn', 2, {
      'attribute': 1,
      'baseIndent': 1,
      'closeBracket': 0,
      'alignAttributesVertically': true,
      'ignores': []
    }],
    'vue/max-attributes-per-line': ['warn', {
      'singleline': 2,
      'multiline': {
        'max': 2,
      }
    }],
    'vue/html-self-closing': ['warn', {
      'html': {
        'void': 'always',
        'normal': 'always',
        'component': 'always'
      },
      'svg': 'always',
      'math': 'always'
    }],
    'vue/html-quotes': [ 'warn', 'double', { 'avoidEscape': true } ],
    'vue/no-parsing-error': ['error', {
      'abrupt-closing-of-empty-comment': true,
      'absence-of-digits-in-numeric-character-reference': true,
      'cdata-in-html-content': true,
      'character-reference-outside-unicode-range': true,
      'control-character-in-input-stream': true,
      'control-character-reference': true,
      'eof-before-tag-name': true,
      'eof-in-cdata': true,
      'eof-in-comment': true,
      'eof-in-tag': true,
      'incorrectly-closed-comment': true,
      'incorrectly-opened-comment': true,
      'invalid-first-character-of-tag-name': true,
      'missing-attribute-value': true,
      'missing-end-tag-name': true,
      'missing-semicolon-after-character-reference': true,
      'missing-whitespace-between-attributes': true,
      'nested-comment': true,
      'noncharacter-character-reference': true,
      'noncharacter-in-input-stream': true,
      'null-character-reference': true,
      'surrogate-character-reference': true,
      'surrogate-in-input-stream': true,
      'unexpected-character-in-attribute-name': true,
      'unexpected-character-in-unquoted-attribute-value': true,
      'unexpected-equals-sign-before-attribute-name': true,
      'unexpected-null-character': true,
      'unexpected-question-mark-instead-of-tag-name': true,
      'unexpected-solidus-in-tag': true,
      'unknown-named-character-reference': true,
      'end-tag-with-attributes': true,
      'duplicate-attribute': true,
      'end-tag-with-trailing-solidus': true,
      'non-void-html-element-start-tag-with-trailing-solidus': false,
      'x-invalid-end-tag': true,
      'x-invalid-namespace': true
    }]
  },
  'overrides': [
    {
      'files': ['*.vue'],
      'rules': {
        'indent': 'off'
      }
    }
  ],
  'parser': 'vue-eslint-parser',
  'parserOptions': {
    'parser': 'babel-eslint',
    'sourceType': 'module'
  }
}