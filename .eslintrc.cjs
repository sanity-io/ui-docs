'use strict'

/** @type import('eslint').Linter.Config */
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'react-hooks', 'simple-import-sort', 'prettier'],
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-console': 'error',
    'no-warning-comments': [
      'warn',
      {
        location: 'start',
        terms: ['todo', '@todo', 'fixme'],
      },
    ],
    'prettier/prettier': 'warn',
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/prop-types': 'off',
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': 'warn',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/jsx-runtime',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      plugins: ['@typescript-eslint', 'react', 'react-hooks', 'simple-import-sort', 'prettier'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': 'off',
        'react/prop-types': 'off',
      },
    },
  ],
}
