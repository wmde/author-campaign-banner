const { merge } = require( 'webpack-merge' );
const CommonConfig = require( './webpack.common.js' );
const webpack = require( 'webpack' );
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );

module.exports = merge( CommonConfig, {
	plugins: [
		new webpack.LoaderOptionsPlugin( {
			minimize: true,
			debug: false
		} ),
		new webpack.DefinePlugin( {
			'process.env': {
				NODE_ENV: JSON.stringify( 'production' )
			}
		} )
	],
	optimization: {
		minimizer: [ new UglifyJsPlugin( {
			uglifyOptions: {
				mangle: {
					ie8: false,
					keep_fnames: true,
					reserved: [ '$', 'exports', 'require' ]
				},
				output: {
					beautify: false,
					comments: false
				}
			}
		} ) ]
	}
} );
