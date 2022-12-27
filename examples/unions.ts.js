(function () {
	/**
	 * @param {string|string[]|() => string|{ s: string }} arg
	 * @returns {string}
	 */
	function start(arg) {
		if (typeof arg === 'string') {
			return commonCase(arg);
		} else if (Array.isArray(arg)) {
			return arg.map(commonCase).join(',');
		} else if (typeof arg === 'function') {
			return commonCase(arg());
		} else {
			return commonCase(arg.s);
		}
		/**
		 * @param {string} s
		 * @returns {string}
		 */
		function commonCase(s) {
			return s;
		}
	}
	return module.exports;
})();
