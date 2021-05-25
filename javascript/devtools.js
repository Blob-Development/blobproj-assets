/* Simplified devtools, adapted from https://github.com/sindresorhus/devtools-detect */

(() => {
	'use strict';
	var devtools = {isOpen: false, orientation: undefined}, threshold = 160,
  
  emitEvent = (isOpen, orientation) => {
		window.dispatchEvent(new CustomEvent('devtoolschange', {detail: { isOpen, orientation }}));
	},
  
  main = ({emitEvents = true} = {}) => {
		var widthThreshold = window.outerWidth - window.innerWidth > threshold, heightThreshold = window.outerHeight - window.innerHeight > threshold, orientation = widthThreshold ? 'vertical' : 'horizontal';

		if (!(heightThreshold && widthThreshold) && ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
			if ((!devtools.isOpen || devtools.orientation !== orientation) && emitEvents) emitEvent(true, orientation);
			devtools.isOpen = true;
			devtools.orientation = orientation;
		} else {
			if (devtools.isOpen && emitEvents) emitEvent(false, undefined);
			devtools.isOpen = false;
			devtools.orientation = undefined;
		};
	};

	main({emitEvents: false});
	setInterval(main, 1000);

	if (typeof module !== 'undefined' && module.exports) module.exports = devtools;
	else window.devtools = devtools;
})();
