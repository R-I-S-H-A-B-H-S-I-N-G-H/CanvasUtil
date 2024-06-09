const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	// Path to your entry point. From this file Webpack will begin its work
	// entry: "./src/canvasUtil.js",
	entry: "./src/canvasUtil.ts",
	devtool: "inline-source-map",

	// Path and filename of your result bundle.
	// Webpack will bundle all JavaScript into this file
	output: {
		filename: "canvasUtil.js",
		path: path.resolve(__dirname, "dist"),
		library: "CanvasUtil",
		libraryTarget: "umd",
	},

	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},

	// Default mode for Webpack is production.
	// Depending on mode Webpack will apply different things
	// on the final bundle. For now, we don't need production's JavaScript
	// minifying and other things, so let's set mode to development
	mode: "development",
};
