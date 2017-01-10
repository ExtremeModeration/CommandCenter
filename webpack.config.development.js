var path = require('path')
var webpack = require('webpack')
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer')
var nodeExternals = require('webpack-node-externals')

var config = {
  entry: [
    'webpack-hot-middleware/client?reload=true&path=http://localhost:9000/__webpack_hmr',
    './src/index',
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      }, {
        test: /\.styl$/,
        loader: 'style!css?modules!stylus'
      }, {
        test: /\.css$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        include: /flexboxgrid/
      }, {
        test: /\.png|\.svg$/,
        loader: 'file'
      }
    ]
  },
  output: {
    path: __dirname + '/dist',
    publicPath: 'http://localhost:9000/dist/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: path.join(__dirname, 'src')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

config.target = webpackTargetElectronRenderer(config);
module.exports = config;
