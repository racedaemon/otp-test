module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    '@typescript-eslint'
  ],
  'rules': {
    // Allow paren-less arrow functions only when there's no braces
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    // Allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    // Prefer const over let
    'prefer-const': ['error', {
      destructuring: 'any',
      ignoreReadBeforeAssign: false
    }],
    // No single if in an "else" block
    'no-lonely-if': 'error',
    // Force curly braces for control flow,
    // including if blocks with a single statement
    curly: ['error', 'all'],
    // No async function without await
    'require-await': 'error',
    // Force dot notation when possible
    'dot-notation': 'error',
    'no-var': 'error',
    // Force object shorthand where possible
    'object-shorthand': 'error',
    // No useless destructuring/importing/exporting renames
    'no-useless-rename': 'error',

    'indent': [
      'error',
      2
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [2, 'never'],
    'comma-dangle': [
      'error',
      'only-multiline'
    ]
  }
}