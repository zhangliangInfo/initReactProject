module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:react/recommended'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'react/prop-types': 0,
    'indent': ['error', 2],
    'linebreak-style': 1,
    'quotes': ['error', 'single'],
    'import/no-unresolved': 0,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    es6: true,
    browser: true,
    node: true
  },
  settings: {
    react: {
      version: '18'
    }
  }
}