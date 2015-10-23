module.exports = {
	entry: [
		'./source/PokerGameContainer.js'
	],
		output: {
		path: __dirname,
		filename: "bundle.js"
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel'
		}]
	}
};
