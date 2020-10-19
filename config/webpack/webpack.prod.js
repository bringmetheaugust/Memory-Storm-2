const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('./webpack.config.js');

config.output = {
	path: path.resolve(__dirname, '../../dist'),
	filename: '[chunkhash].js',
	publicPath: ''
};

config.plugins.push(
	new MiniCssExtractPlugin({
		filename: '[hash].css',
	}),
);

config.mode = 'production';

module.exports = config;
