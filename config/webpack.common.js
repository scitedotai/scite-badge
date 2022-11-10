const path = require('path')
const { execSync } = require('child_process')
const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const TAG = execSync('git describe --abbrev=0').toString().trim()

module.exports = {
  entry: {
    'script/badge': './src/index.js',
    'lib/badge': './src/main.js',
    'lib/components': './src/exported-components.js'
  },

  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      __VERSION__: JSON.stringify(TAG)
    }),
    new MiniCssExtractPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'swc-loader'
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ],
        include: /node_modules/
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    library: {
      type: 'umd'
    }
  }
}
