/* eslint-env node */

const { join: joinPath } = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const package = require('./package.json');

const DEV = 'development';
const PROD = 'production';

const BUILD_DIR = 'build';
const NODE_MOD_DIR = 'node_modules';
const PUBLIC_DIR = 'public';
const SRC_DIR = 'src';

const ASSET_RES = 'asset/resource';

/** @type {() => Record<string, unknown>} */
function getManifest() {
  return {
    manifest_version: 3,
    name: package.name,
    version: package.version,
    author: package.author,
    description: package.description,
    icons: {
      16: 'icons/icon16.png',
      48: 'icons/icon48.png',
      128: 'icons/icon128.png',
    },
    action: {
      default_icon: {
        16: 'icons/icon16.png',
        24: 'icons/icon24.png',
        32: 'icons/icon32.png',
      },
      default_title: 'Extension',
      default_popup: 'popup.html',
    },
    // options_page: 'options.html',
    // devtools_page: 'devtools.html',
    background: {
      service_worker: 'background.js'
    },
    content_scripts: [
      {
        matches: ['*://*/*'],
        js: ['js/content.js']
      }
    ],
  };
}

/** @type {(env: 'development' | 'production' | 'test') => import('webpack').Configuration} */
const config = (env) => {
  return {
    mode: env === PROD ? PROD : DEV,
    devtool: env === PROD ? false : 'source-map',
    devServer: {
      compress: true,
      host: 'localhost',
      index: 'index.html',
      open: true,
      overlay: true,
      port: 3003,
      static: PUBLIC_DIR,
    },
    resolve: {
      alias: {
        '@': getFullPath(SRC_DIR),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    entry: {
      background: {
        import: getEntryPath('background'),
        filename: 'background.js',
      },
      content: getEntryPath('content'),
      popup: getEntryPath('popup'),
      // options: getEntryPath('options'),
      // devtools: getEntryPath('devtools'),
    },
    output: {
      filename: 'js/[name].js',
      path: getFullPath(BUILD_DIR),
    },
    module: {
      rules: [
        {
          // Source
          test: /\.[jt]sx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript',
              ],
              plugins: [
                env === DEV && 'react-refresh/babel',
              ].filter(Boolean),
            },
          },
          exclude: /node_modules/,
          include: [getFullPath(SRC_DIR)],
        },
        {
          // Stylesheet
          test: /\.(s[ac]|c)ss$/i,
          use: [
            env === PROD ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          // Font
          test: /\.(eot|otf|ttf|woff2?)$/i,
          type: ASSET_RES,
          generator: {
            filename: 'fonts/[hash][ext][query]',
          },
        },
        {
          // Image
          test: /\.(gif|jpe?g|png|svg|webp)$/i,
          type: ASSET_RES,
          generator: {
            filename: 'images/[hash][ext][query]',
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
      }),
      env === PROD && new MiniCssExtractPlugin({
        filename: 'css/[name].css',
      }),
      newHtmlPage('popup'),
      // newHtmlPage('options'),
      // newHtmlPage('devtools'),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: PUBLIC_DIR + '/icons',
            to: 'icons',
          },
          {
            from: PUBLIC_DIR + '/manifest.json',
            transform() {
              return Buffer.from(JSON.stringify(getManifest(), null, 2));
            },
          },
        ],
      }),
      env === DEV && new ReactRefreshWebpackPlugin(),
      env === PROD && new ProgressBarWebpackPlugin(),
      new ESLintWebpackPlugin({
        baseConfig: require('./.eslintrc'),
        cache: true,
        cacheLocation: getFullPath(NODE_MOD_DIR, '.cache/.eslintcache'),
        cwd: __dirname,
        eslintPath: require.resolve('eslint'),
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        failOnError: true,
        formatter: require.resolve('react-dev-utils/eslintFormatter'),
        resolvePluginsRelativeTo: __dirname,
      }),
    ].filter(Boolean),
  };
};

/** @type {(...relPaths: string[]) => string} */
function getFullPath(...relPaths) {
  return joinPath(__dirname, ...relPaths);
}

/** @type {(srcDirName: string, fileName?: string)} */
function getEntryPath(srcDirName, fileName = 'index.ts') {
  return getFullPath(SRC_DIR, srcDirName, fileName);
}

/** @type {(srcDirName: string, pageName?: string) => HtmlWebpackPlugin} */
function newHtmlPage(srcDirName, pageName = 'index.html') {
  return new HtmlWebpackPlugin({
    filename: `${srcDirName}.html`,
    template: getFullPath(SRC_DIR, srcDirName, pageName),
    chunks: [srcDirName],
  });
}

module.exports = config;
