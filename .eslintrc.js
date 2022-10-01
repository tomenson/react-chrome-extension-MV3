/* eslint-disable @typescript-eslint/no-unused-vars */

const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';
const NEVER = 'never';

/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'react',
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      'typescript': {
        alwaysTryTypes: true,
        project: '<root>/tsconfig.json',
      },
    },
    'react': {
      version: 'detect'
    }
  },
  ignorePatterns: ['**/*.min.js'],
  reportUnusedDisableDirectives: true,
  rules: {
    'arrow-body-style': OFF,
    'linebreak-style': 0,
    'max-len': OFF,
    'no-console': OFF,
    'no-empty': OFF,
    'no-restricted-syntax': OFF,
    'no-underscore-dangle': OFF,
    'no-unused-vars': OFF,
    'no-use-before-define': OFF,
    'operator-linebreak': OFF,
    'prefer-template': OFF,
    'space-before-function-paren': 0,
    '@typescript-eslint/no-empty-interface': OFF,
    '@typescript-eslint/no-unused-vars': WARN,
    '@typescript-eslint/no-use-before-define': [OFF],
    '@typescript-eslint/no-var-requires': [OFF],
    'import/extensions': [WARN, { js: NEVER, jsx: NEVER, ts: NEVER, tsx: NEVER }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-fragments': 0,
    'react/jsx-handler-names': 0,
    'react/jsx-one-expression-per-line': OFF,
    'react/no-unescaped-entities': OFF,
    'react/no-unused-prop-types': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': OFF
  }
};

module.exports = config;
