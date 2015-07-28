module.exports = {
  cache: true,
  entry: './src/main/javascript/app',
  output: {
	path: 'target/classes/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.css$/, loader: "style!css" }
	]
  }
};
