(function () {
	/**
	 * @param {string} jsonString
	 */
	const jsonParser = (jsonString) => JSON.parse(jsonString);
	const myAccount = jsonParser('{ "name": "Dorothea" }');
	myAccount.name;
	myAccount.email;
	/**
	 * @param {string} jsonString
	 * @returns {unknown}
	 */
	const jsonParserUnknown = (jsonString) => JSON.parse(jsonString);
	const myOtherAccount = jsonParserUnknown('{ "name": "Samuel" }');
	myOtherAccount.name;
	/**
	 * @typedef User
	 * @type {{ name: string }}
	 */
	const myUserAccount = jsonParserUnknown('{ "name": "Samuel" }');
	myUserAccount.name;

	const neverReturns = () => {
		require('assert')(false, new Error('Always throws, never returns'));
	};
	const myValue = neverReturns();
	/**
	 * @param {User} user
	 */
	const validateUser = (user) => {
		if (user) {
			return user.name !== 'NaN';
		}
		return neverReturns();
	};
	const Flower = {
		0: 'Rose',
		1: 'Rhododendron',
		2: 'Violet',
		3: 'Daisy',
		Rose: 0,
		Rhododendron: 1,
		Violet: 2,
		Daisy: 3,
	};
	/**
	 * @param {Flower} flower
	 */
	const flowerLatinName = (flower) => {
		switch (flower) {
			case Flower.Rose:
				return 'Rosa rubiginosa';
			case Flower.Rhododendron:
				return 'Rhododendron ferrugineum';
			case Flower.Violet:
				return 'Viola reichenbachiana';
			case Flower.Daisy:
				return 'Bellis perennis';
			default:
				/**
				 * @type {never}
				 */
				const _exhaustiveCheck = flower;
				return _exhaustiveCheck;
		}
	};
	/**
	 * @typedef NeverIsRemoved
	 * @type {string|never|number}
	 */
	return module.exports;
})();
