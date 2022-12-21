do {
	console.log('do-while loop');
	break;
} while (true);

while (true) {
	console.log('while loop');
	break;
}

for (; ;) {
	console.log('woah, look! a for index loop');
	break;
}

for (const a of ['']) {
	console.log(a, 'for of iterator loop');
	break;
}

for (const a in global) {
	console.log(a, 'for in iterator loop');
	break;
}

let established = false; // eslint is weird
while (!established) {
	try {
		// await ping();
		established = true;
	} catch { void -1; }
	
	// await wait(1);
}

// @ts-ignore
// with ([1,2,3,4]) {
// 	console.log('with statement;', toString());
// }

console.log('Loaded a ts file;', __filename);