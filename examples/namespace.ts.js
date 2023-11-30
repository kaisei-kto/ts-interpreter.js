const ns = (function () {
	class c1 {}
	this.c1 = c1;
	function a() {}
	this.a = a;
	/**
	 * @param {string} ab
	 */
	function b(ab) {}
	this.b = b;
	const c = { d: true };
	this.c = c;
	const e = [c];
	this.e = e;
	return this;
})();
module.exports.ns = ns;
const FacadePattern = (function () {
	class Part1 {
		/**
		 * @returns {void}
		 */
		method1() {
			console.log('`method1` of Part1');
		}
	}
	this.Part1 = Part1;
	class Part2 {
		/**
		 * @returns {void}
		 */
		method2() {
			console.log('`method2` of Part2');
		}
	}
	this.Part2 = Part2;
	class Part3 {
		/**
		 * @returns {void}
		 */
		method3() {
			console.log('`method3` of Part3');
		}
	}
	this.Part3 = Part3;
	class Facade {
		/**
		 * @type {Part1}
		 * @private
		 */
		part1 = new Part1();
		/**
		 * @type {Part2}
		 * @private
		 */
		part2 = new Part2();
		/**
		 * @type {Part3}
		 * @private
		 */
		part3 = new Part3();
		/**
		 * @returns {void}
		 */
		operation1() {
			console.log('`operation1` is called ===');
			this.part1.method1();
			this.part2.method2();
			console.log('==========================');
		}
		/**
		 * @returns {void}
		 */
		operation2() {
			console.log('`operation2` is called ===');
			this.part1.method1();
			this.part3.method3();
			console.log('==========================');
		}
	}
	this.Facade = Facade;
	return this;
})();
