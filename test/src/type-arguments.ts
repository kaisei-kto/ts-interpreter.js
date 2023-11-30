function identity<T>(arg: T): T {
	return arg;
}

let output = identity<string>('myString'); // Type of output is 'string'

function makePair<F, S>() {
	let pair: { first: F; second: S };

	function getPair() {
		return pair;
	}

	function setPair(x: F, y: S) {
		pair = {
			first: x,
			second: y,
		};
	}
	return { getPair, setPair };
}
const { getPair, setPair } = makePair<number, string>(); // Creates a pair
setPair(1, 'y'); // Must pass (number, string)
