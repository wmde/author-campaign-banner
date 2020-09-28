module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				// debug: true,
				useBuiltIns: 'usage',
				corejs: { version: 3, proposals: true }
			}
		]
	],
	plugins: [
		'@babel/plugin-transform-object-assign',
		'@babel/plugin-proposal-class-properties'
	],
	exclude: /webpack/
};
