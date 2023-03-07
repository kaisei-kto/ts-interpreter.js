(function () {
	const usersAge = '23';
	/**
	 * @interface
	 * @typedef InputEvent
	 * @type {object}
	 * @property {number} timestamp
	 */
	/**
	 * @interface
	 * @typedef MouseInputEvent
	 * @type {object}
	 * @extends {InputEvent}
	 * @property {number} x
	 * @property {number} y
	 */
	/**
	 * @interface
	 * @typedef KeyboardInputEvent
	 * @type {object}
	 * @extends {InputEvent}
	 * @property {number} keyCode
	 */
	/**
	 * @param {'keyboard'|'mouse'} eventType
	 * @param {(event: InputEvent) => void} handler
	 */
	function listenForEvent(eventType, handler) {}
	listenForEvent(
		'keyboard',
		/**
		 * @param {KeyboardInputEvent} event
		 */
		(event) => {},
	);
	listenForEvent(
		'mouse',
		/**
		 * @param {MouseInputEvent} event
		 */
		(event) => {},
	);
	listenForEvent(
		'mouse',
		/**
		 * @param {{  }} event
		 */
		(event) => {},
	);
	listenForEvent(
		'mouse',
		/**
		 * @param {string} event
		 */
		(event) => {},
	);
	/**
	 * @param {number} count
	 * @param {(...args: number[]) => void} callback
	 */
	function getRandomNumbers(count, callback) {}
	getRandomNumbers(
		2,
		/**
		 * @param {any} first
		 * @param {any} second
		 */
		(first, second) => console.log([first, second]),
	);
	getRandomNumbers(
		400,
		/**
		 * @param {any} first
		 */
		(first) => console.log(first),
	);

	const getPI = () => 3.14;
	/**
	 * @param {() => void} func
	 */
	function runFunction(func) {
		func();
	}
	runFunction(getPI);
	return module.exports;
})();
