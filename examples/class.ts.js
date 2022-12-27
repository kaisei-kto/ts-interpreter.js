(function () {
	class Point {
		/**
		 * @type {number}
		 */
		x;
		/**
		 * @type {number}
		 */
		y;
		/**
		 * @param {any}
		 * @param {any}
		 */
		constructor(x = 0, y = 0) {
			this.x = x;
			this.y = y;
		}
	}
	class Base {
		k = 4;
	}
	class Derived extends Base {
		constructor() {
			super();
			console.log(this.k);
		}
	}
	class C {
		_length = 0;

		get length() {
			return this._length;
		}
		/**
		 * @param {any} value
		 */
		set length(value) {
			this._length = value;
		}
	}
	class Thing {
		/**
		 * @type {number}
		 */
		_size = 0;
		/**
		 * @returns {number}
		 */
		get size() {
			return this._size;
		}
		/**
		 * @param {string|number|boolean} value
		 */
		set size(value) {
			let num = Number(value);
			if (!Number.isFinite(num)) {
				this._size = 0;
				return;
			}
			this._size = num;
		}
	}
	class MyClass {
		/**
		 * @param {string} s
		 */
		check(s) {
			return this[s];
		}
	}
	function first() {
		console.log('first(): factory evaluated');
		/**
		 * @param {any} target
		 * @param {string} propertyKey
		 * @param {PropertyDescriptor} descriptor
		 */
		return function (target, propertyKey, descriptor) {
			console.log('first(): called');
		};
	}
	function second() {
		console.log('second(): factory evaluated');
		/**
		 * @param {any} target
		 * @param {string} propertyKey
		 * @param {PropertyDescriptor} descriptor
		 */
		return function (target, propertyKey, descriptor) {
			console.log('second(): called');
		};
	}
	class ExampleClass {
		@first()
		@second()
		method() {}
	}
	return module.exports;
})();
