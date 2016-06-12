const webpack = require('webpack');
const path = require('path');

const dir = path.resolve(__dirname, 'dist');

const config = {
	entry: './src/index.jsx',
	output: {
		path: 'dist',
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?/,
				loader: 'babel',
				exclude: /(node_modules)/
			}
		]
	}
}

module.exports = config;