(function () {
	/**
	 * @typedef Cat
	 * @type {{ meows: true }}
	 */
	/**
	 * @typedef Dog
	 * @type {{ barks: true }}
	 */
	/**
	 * @typedef Cheetah
	 * @type {{ meows: true, fast: true }}
	 */
	/**
	 * @typedef Wolf
	 * @type {{ barks: true, howls: true }}
	 */
	/**
	 * @typedef ExtractDogish
	 * @template A
	 * @type {A extends { barks: true } ? A : never}
	 */
	/**
	 * @typedef NeverCat
	 * @type {ExtractDogish<Cat>}
	 */
	/**
	 * @typedef Wolfish
	 * @type {ExtractDogish<Wolf>}
	 */
	/**
	 * @typedef Animals
	 * @type {Cat|Dog|Cheetah|Wolf}
	 */
	/**
	 * @typedef Dogish
	 * @type {ExtractDogish<Animals>}
	 */
	/**
	 * @TODO {TSDeclareFunction}
	 */
	let stringReturnValue = getID(true);
	let numberReturnValue = getID(false);
	let stringOrNumber = getID(Math.random() < 0.5);
	/**
	 * @TODO {TSDeclareFunction}
	 */
	/**
	 * @typedef GetReturnValue
	 * @template T
	 * @type {T extends (...args: any[]) => infer R ? R : T}
	 */
	/**
	 * @typedef getIDReturn
	 * @type {GetReturnValue<typeof getID>}
	 */
	/**
	 * @typedef getCat
	 * @type {GetReturnValue<Cat>}
	 */
	return module.exports;
})();
