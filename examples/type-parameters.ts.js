(function () {
	const LogLevel = {
		0: 'ERROR',
		1: 'WARN',
		2: 'INFO',
		3: 'DEBUG',
		ERROR: 0,
		WARN: 1,
		INFO: 2,
		DEBUG: 3,
	};
	/**
	 * @typedef LogLevelStrings
	 * @type {keyof typeof LogLevel}
	 */
	/**
	 * @param {T} t1
	 * @param {T} t2
	 * @returns {T}
	 */
	function firstish(t1, t2) {
		return t1.length > t2.length ? t1 : t2;
	}
	/**
	 * @param {T} t
	 * @returns {Array<T>}
	 */
	function liftArray(t) {
		return [t];
	}
	return module.exports;
})();
