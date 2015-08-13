var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  cache: true,
  entry: './src/main/javascript/app',
  output: {
	path: 'target/classes/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: {stage: 0}},
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      { test: /\.(png|jpg|eot|ttf|svg|woff|woff2)$/, loader: 'url-loader?limit=8192' },
	]
  },
//  externals: {
//      'react': 'React',
//      'jquery': 'jquery',
//      'bootstrap': 'bootstrap'
//  },
  plugins: [
	new webpack.ProvidePlugin({
	  $: "jquery",
	  jQuery: "jquery"
	}),
	new ExtractTextPlugin("[name].css", { allChunks: true })
  ]
};
