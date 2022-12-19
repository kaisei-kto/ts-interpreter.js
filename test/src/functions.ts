let f: any = function() {
	return arguments;
};
f("a"); // -> { '0': 'a' }

f = () => f.callee;
f("a"); // -> { '0': 'a' }
console.log('Loaded a ts file;', __filename);