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
		s: string;
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
	class QueryBuilder {
		/**
		 * @type {string}
		 * @private
		 */
		collection;
		/**
		 * @type {number}
		 * @private
		 */
		pageNumber = 1;
		/**
		 * @type {number}
		 * @private
		 */
		itemsPerPage = 100;
		/**
		 * @type {string[]}
		 * @private
		 */
		orderByFields = [];
		/**
		 * @param {string} collection
		 * @returns {this}
		 */
		from(collection) {
			this.collection = collection;
			return this;
		}
		/**
		 * @param {number} number
		 * @param {any}
		 * @returns {this}
		 */
		page(number, itemsPerPage = 100) {
			this.pageNumber = number;
			this.itemsPerPage = itemsPerPage;
			return this;
		}
		/**
		 * @param {string[]}
		 * @returns {this}
		 */
		orderBy(...fields) {
			this.orderByFields = fields;
			return this;
		}
		/**
		 * @returns {Query}
		 */
		build() {}
	}
	const query = new QueryBuilder()
		.from('users')
		.page(1, 100)
		.orderBy('firstName', 'lastName')
		.build();
	return module.exports;
})();
