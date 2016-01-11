seajs.config({
	base: './Public/libs/',
	alias: {
		"jquery": 'jquery-1.11.3.min.js',
	},
	preload : ['jquery'],
});