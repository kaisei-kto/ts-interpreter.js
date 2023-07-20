(function () {
	/**
	 * @interface
	 * @typedef Ball
	 * @type {object}
	 * @property {number} diameter
	 */
	/**
	 * @interface
	 * @typedef Sphere
	 * @type {object}
	 * @property {number} diameter
	 */
	/**
	 * @type {Ball}
	 */
	let ball = { diameter: 10 };
	/**
	 * @type {Sphere}
	 */
	let sphere = { diameter: 20 };
	sphere = ball;
	ball = sphere;
	/**
	 * @interface
	 * @typedef Tube
	 * @type {object}
	 * @property {number} diameter
	 * @property {number} length
	 */
	/**
	 * @type {Tube}
	 */
	let tube = { diameter: 12, length: 3 };
	tube = ball;
	ball = tube;
	/**
	 * @param {number} diameter
	 */
	let createBall = (diameter) => ({ diameter });
	/**
	 * @param {number} diameter
	 * @param {boolean} useInches
	 */
	let createSphere = (diameter, useInches) => {
		return { diameter: useInches ? diameter * 0.39 : diameter };
	};
	createSphere = createBall;
	createBall = createSphere;
	b;

	[createBall(1), createBall(2)].forEach(
		/**
		 * @param {any} ball
		 * @param {any} _index
		 * @param {any} _balls
		 */
		(ball, _index, _balls) => {
			console.log(ball);
		},
	);
	/**
	 * @param {number} diameter
	 */
	let createRedBall = (diameter) => ({ diameter, color: 'red' });
	createBall = createRedBall;
	createRedBall = createBall;
	return module.exports;
})();
