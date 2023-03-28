import { dirname, join, resolve } from 'node:path'
import { fileURLToPath  } from 'node:url'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const _dirName = dirname(fileURLToPath(import.meta.url))

export default {
  entry: './src/index.ts',
  output: {
    path: resolve(_dirName, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      chrome: '108',
                      // ie: '11',
                    },
                    corejs: '3',
                    useBuiltIns: 'usage',
                  },
                ]
              ],
            },
          },
          'ts-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions',
                    },
                  ],
                ],
              },
            },
          },
          'less-loader',
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: join(_dirName, './src/index.html'),
    }),
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
}
