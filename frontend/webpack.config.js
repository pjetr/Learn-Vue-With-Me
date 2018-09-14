const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const config = {
  mode: 'development',
  entry: {
    main: './src/index.ts'
  },
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'public_html'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loaders: ['awesome-typescript-loader'] },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { modules: true } }
        ]
      },
      {
        test: /\.scss$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }]
      },
      { test: /\.html$/, loader: 'html-loader' },
      // Images
      { test: /\.(png|jpe?g|gif|ico)$/, loader: 'file-loader?name=assets/images/[name].[ext]' },
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      template: path.resolve( __dirname, './src/index.ejs' ),
      inject: 'head',
      minify: {collapseWhitespace: true},
    }),
    new FaviconsWebpackPlugin({
      logo: './icon.png',
      prefix: 'icons-[hash]/',
      emitStats: false,
      statsFilename: 'iconstats-[hash].json',
      persistentCache: true,
      inject: true,
      background: '#fff',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: true
      }
    })
  ]
};

module.exports = config;
