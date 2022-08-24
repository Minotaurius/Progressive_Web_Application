const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'J.A.T.E',
        filename: 'index.html',
        template: path.join(__dirname, 'src/index.html'),
        inject: 'body'
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css'
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        name: 'Just Another Text Editor',
        short_name: "J.A.T.E",
        description: "A browser or computer application to take notes!",
        background_color: '#b0b8b2',
        start_url: './',
        publicPath: './',
        inject: true,
        theme_color: '#b0b8b2',
        icons: {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          ios: true
        }

      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.js$/,
          exclude: [/node_modules/, require.resolve('./index.html')],
          use: {
            loader: 'babel-loader', 
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },
  };
};
