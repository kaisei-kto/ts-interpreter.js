class a {

}

class b extends a {
	private _b;
	constructor(b) {
		super();
		this._b = b
	}

	get str() {
		return ['getter str', this._b];
	}
}

export {
	a, b
}

const b_class = new b;
console.log(b_class.str)
const b_class_2 = new b(0);
console.log(b_class_2.str)