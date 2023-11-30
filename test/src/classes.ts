class a {}

const s = '';

class b implements a {
	private _b;
	constructor(b) {
		this._b = b;
	}

	get str(): typeof s {
		return ['getter str', this._b];
	}
}

class external {
	static pname: string = 'hmmm?';
}

class main {
	readonly prop: string = 'no';
	run() {
		console.log('im running!!!!');
		console.log(external.pname);
	}
}

export class ccc {
	constructor() {}
}

export { a, b };

const obj = new (class {
	constructor() {}
})();

console.log(`module.exports.ccc === ${module.exports.ccc}`);

const m = new main();
m.run();

class User {
	constructor(public username: string) {}
}

const user = new User('mariusschulz');
const username = user.username.toLowerCase();

console.log('Loaded a ts file;', __filename);
