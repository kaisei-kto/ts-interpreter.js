(function () {
	/**
	 * @interface
	 * @typedef FirstType
	 * @type {object}
	 * @property {number} id
	 * @property {string} firstName
	 * @property {string} lastName
	 */
	/**
	 * @interface
	 * @typedef SecondType
	 * @type {object}
	 * @property {number} id
	 * @property {string} address
	 * @property {string} city
	 */
	/**
	 * @typedef ExcludeType
	 * @type {Exclude<FirstType, SecondType>}
	 */
	return module.exports;
})();
