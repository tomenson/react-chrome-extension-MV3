const { resolve: resolvePath } = require('path');

/** @type {import('eslint').Linter.Config} */
const config = {
  extends: resolvePath(__dirname, '../../.eslintrc'),
  env: {
    browser: false,
    serviceworker: true,
    webextensions: true,
  },
};

module.exports = config;
