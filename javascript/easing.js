/* Simplified jQuery Easing, adapted from https://github.com/gdsmith/jquery.easing */

((x) => {
	if (typeof define === "function" && define.amd) {
		define(['jquery'], ($) => {
			return x($);
		});
	} else if (typeof module === "object" && typeof module.exports === "object") {
		module.exports = x(require('jquery'));
	} else {
		x(jQuery);
	}
})(($) => {
	if (typeof $.easing !== 'undefined') $.easing['jswing'] = $.easing['swing'];
	$.extend($.easing, {
		easeInExpo: (x) => {
			return x === 0 ? 0 : Math.pow( 2, 10 * x - 10 );
		},
		easeOutExpo: (x) => {
			return x === 1 ? 1 : 1 - Math.pow( 2, -10 * x );
		}
	});
	return $;
});
