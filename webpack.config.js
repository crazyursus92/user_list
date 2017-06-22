const webpack = require('webpack');
const path = require('path');
const ENV = 'dev';
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [
	{
		entry: [
			__dirname + "/frontend_dev/scss/main.scss",
			__dirname + "/frontend_dev/js/",
		],
		output: {
			path: path.resolve(__dirname, "web/js"),
			filename: "[name].js",
			publicPath: "/",
			library: "app"
		},
		resolve: {
			extensions: ['.js', '.jsx'],
		},

		watch: ENV === 'dev',
		watchOptions: {
			aggregateTimeout: 100
		},

		devtool: ENV === 'dev' ? 'sourcemap' : null,
		plugins: [
			new webpack.NoEmitOnErrorsPlugin(),
			new webpack.DefinePlugin({
			}),
			new ExtractTextPlugin({filename: 'style.css', allChunks: true})
		],

		module: {
			loaders: [
				{
					test: /\.(png|jpg|svg|gif|ttf|eot|woff|woff2)$/,
					loader: 'file-loader?name=[path][name].[ext]'
				},

				{
					test: /\.js?$/,
					exclude: [/test\.js/, /node_modules/],
					loader: "babel-loader",
					query: {
						presets: ['es2015', 'react', 'stage-0', 'stage-1']
					}
				},
				{
					test:   /\.(pug|jade)$/,
					loader: 'jade-loader'
				},
				{
					test: /\.scss/,
					loader: ExtractTextPlugin.extract({
						use: 'css-loader!autoprefixer-loader!resolve-url-loader!sass-loader?sourceMap'
					})
				},


			],
			//noParse
		},
		devServer: {
			contentBase: __dirname + '/web/js',
		}
	}];