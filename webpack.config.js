const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
	entry: {
		name: './src/js/index.js',
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js',
		publicPath: ''
	},
	devtool: 'source-map',
	devServer:{
		contentBase: './dist',
		watchContentBase: true,
  		compress: true,
		overlay: true,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options:{
                    presets:["@babel/preset-env", "@babel/preset-react"],
                    plugins: [["@babel/plugin-proposal-class-properties", {loose: true}]]
                }
            },
			{
				test: /\.sass$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: true
							}
						},
						{
							loader: 'postcss-loader'
						},
						{
							loader: 'sass-loader'
						}
					],
					fallback: 'style-loader'
				})
			},
			{
	            test: /\.pug$/,
	            loader: "pug-loader"
	        },
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				use: [
					{
						loader: 'file-loader',
						options:{
							name: '[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.(png|gif|jpe?g)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8000,
							name: 'img/[name].[ext]',
						}
					},
				],
			},
			{
                test: /\.svg/i,
                use: {
                    loader: 'svg-url-loader',
                    options: {}
                }
            },
            {
			    test: /\.mp3$/,
			    loader: 'file-loader'
			},
			 {
			    test: /\.mp4$/,
			    loader: 'file-loader'
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin(
			{
				template: './src/html/index.pug',
				inject: false,
			}
		),
    	new ExtractTextPlugin("style.css"),
    	new CleanWebpackPlugin(['dist']),
  	],
	mode: 'development'
};