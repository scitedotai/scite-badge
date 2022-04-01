const path = require('path')
const { execSync } = require('child_process')
const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const TAG = execSync('git describe --abbrev=0').toString().trim()

module.exports = {
  entry: {
    badge: './src/index.js'
  },

  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      __VERSION__: JSON.stringify(TAG)
    })
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
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ],
        exclude: /node_modules|scite-widget/
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ],
        include: /node_modules|scite-widget/
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  }
}
