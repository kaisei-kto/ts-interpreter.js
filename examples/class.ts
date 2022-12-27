class Point {
	x: number;
	y: number;

	// Normal signature with defaults
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
	set length(value) {
		this._length = value;
	}
}

class Thing {
	_size: number = 0;

	get size(): number {
		return this._size;
	}

	set size(value: string | number | boolean) {
		let num = Number(value);

		// Don't allow NaN, Infinity, etc

		if (!Number.isFinite(num)) {
			this._size = 0;
			return;
		}

		this._size = num;
	}
}

class MyClass {
	[s: string]: boolean | ((s: string) => boolean);

	check(s: string) {
		return this[s] as boolean;
	}
}

function first() {
	console.log("first(): factory evaluated");
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		console.log("first(): called");
	};
}

function second() {
	console.log("second(): factory evaluated");
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		console.log("second(): called");
	};
}

class ExampleClass {
	@first()
	@second()
	method() { }
}