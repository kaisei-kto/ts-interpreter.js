const fail_safe = {};

fail_safe[3] = true;

let f = (idx) => {
	return fail_safe[idx];
}

let r;
if (!r) {
	console.log('unary 1 pass');
}
if (typeof !(r = f('')) === 'bigint') {
	console.log('unary 2 pass')
}

while (typeof (r = f('')) === 'bigint') {
	console.log('hmm')
}

if ('str' instanceof String) {
	console.log("wow 'a boolean!")
}

export {
	fail_safe
}

console.log('Loaded a ts file;', __filename);