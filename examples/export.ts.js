(function () {
	var pi = 3.14;
	module.exports.pi = pi;
	let squareTwo = 1.41;
	module.exports.squareTwo = squareTwo;
	const phi = 1.61;
	module.exports.phi = phi;
	module.exports.RandomNumberGenerator = class {};
	/**
	 * @param {number} num
	 */
	function absolute(num) {
		if (num < 0) return num * -1;
		return num;
	}
	module.exports.absolute = absolute;
	const imported = require('./export.ts');
	console.log(imported.pi);
	return module.exports;
})();
