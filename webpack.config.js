import { dirname, join, resolve } from 'node:path'
import { fileURLToPath  } from 'node:url'

// import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const _dirName = dirname(fileURLToPath(import.meta.url))

export default {
  // mode: process.env.NODE_ENV,
  entry: './src/index.ts',
  output: {
    path: resolve(_dirName, 'dist'),
    filename: '[name].[chunkhash].js',
    clean: true,
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: resolve(_dirName, 'public'),
    port: 9000,
    // compress: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
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
        test: /\.less$/i,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
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
    // new CopyWebpackPlugin({
    //   patterns: [{
    //     from: resolve(_dirName, 'public'),
    //     to: resolve(_dirName, 'dist')
    //   }],
    // }),
    new HtmlWebpackPlugin({
      // favicon: join(_dirName, './public/favicon.png'),
      template: join(_dirName, './src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
}
