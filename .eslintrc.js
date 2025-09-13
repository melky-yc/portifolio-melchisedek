module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        'indent': ['error', 4],
        'linebreak-style': 'off', // Desabilitado para compatibilidade com Windows
        'quotes': 'off', // Desabilitado para flexibilidade
        'semi': ['error', 'always'],
        'no-unused-vars': 'warn',
        'no-console': 'off',
        'no-undef': 'error',
        'prefer-const': 'error',
        'no-var': 'error',
        'object-curly-spacing': ['error', 'always'],
        'array-bracket-spacing': ['error', 'never'],
        'comma-dangle': ['error', 'never'],
        'eol-last': 'off', // Desabilitado para compatibilidade
        'no-trailing-spaces': 'error',
        'max-len': ['warn', { 'code': 120 }],
        'camelcase': 'error',
        'no-multiple-empty-lines': ['error', { 'max': 2 }],
        'space-before-function-paren': ['error', 'never'],
        'keyword-spacing': 'error',
        'space-infix-ops': 'error',
        'space-before-blocks': 'error',
        'brace-style': ['error', '1tbs'],
        'curly': ['error', 'all'],
        'eqeqeq': ['error', 'always'],
        'no-eval': 'error',
        'no-implied-eval': 'error',
        'no-new-func': 'error',
        'no-script-url': 'error',
        'no-alert': 'warn',
        'no-debugger': 'warn',
        'no-duplicate-imports': 'error',
        'no-unreachable': 'error',
        'use-isnan': 'error',
        'valid-typeof': 'error'
    }
};
