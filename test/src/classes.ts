class a {

}

class b implements a {
	private _b;
	constructor(b) {
		this._b = b
	}

	get str() {
		return ['getter str', this._b];
	}
}

class external {
	static pname: string = 'hmmm?';
}

class main {
	readonly prop: string = 'no';
	run() {
		console.log('im running!!!!')
		console.log(external.pname);
	}
}

export {
	a, b
}

const m = new main();
m.run();

console.log('Loaded a ts file;', __filename);