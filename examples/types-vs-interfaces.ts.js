(function () {
	/**
	 * @typedef BirdType
	 * @type {{ wings: 2 }}
	 */
	/**
	 * @interface
	 * @typedef BirdInterface
	 * @type {object}
	 * @property {2} wings
	 */
	/**
	 * @type {BirdType}
	 */
	const bird1 = { wings: 2 };
	/**
	 * @type {BirdInterface}
	 */
	const bird2 = { wings: 2 };
	/**
	 * @type {BirdInterface}
	 */
	const bird3 = bird1;
	/**
	 * @typedef Owl
	 * @type {{ nocturnal: true } & BirdType}
	 */
	/**
	 * @typedef Robin
	 * @type {{ nocturnal: false } & BirdInterface}
	 */
	/**
	 * @interface
	 * @typedef Peacock
	 * @type {object}
	 * @extends {BirdType}
	 * @property {true} colourful
	 * @property {false} flies
	 */
	/**
	 * @interface
	 * @typedef Chicken
	 * @type {object}
	 * @extends {BirdInterface}
	 * @property {false} colourful
	 * @property {false} flies
	 */
	/**
	 * @type {Owl}
	 */
	let owl = { wings: 2, nocturnal: true };
	/**
	 * @type {Chicken}
	 */
	let chicken = { wings: 2, colourful: false, flies: false };
	owl = chicken;
	chicken = owl;
	/**
	 * @interface
	 * @typedef Kitten
	 * @type {object}
	 * @property {boolean} purrs
	 */
	/**
	 * @interface
	 * @typedef Kitten
	 * @type {object}
	 * @property {string} colour
	 */
	/**
	 * @typedef Puppy
	 * @type {{ color: string }}
	 */
	/**
	 * @typedef Puppy
	 * @type {{ toys: number }}
	 */
	return module.exports;
})();
