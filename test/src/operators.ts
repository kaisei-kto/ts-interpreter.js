if ('' ?? true) {
	console.log('operator 1 pass');
}

if ('' ? false : true) {
	console.log('operator 2 pass');
}

console.log('Loaded a ts file;', __filename);