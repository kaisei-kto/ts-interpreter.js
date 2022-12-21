let fyield = function*() {
	for (const n of [1,2]) yield n;
};

let f: any = function() {
	return arguments;
};
f("a"); // -> { '0': 'a' }

f = () => f.callee;
f("a"); // -> { '0': 'a' }

let fyield_generator = fyield();
let index;
do {
	console.log('yield object;', (index = fyield_generator.next()));
} while (!index?.done);

console.log((() => 2)(), 'got 2!');
console.log((function () { return 3 })(), 'got 3!');
(() => {
	console.log('anonymous function works!');
})();

function apple() {
	return (() => 352 + Math.random())()
}

function juice() {
	return (function() {return (function() { return ['1', 2, 3].map(String) })()})()
}

console.log([1,2].find(() => Math.random() > 0.5))

// @ts-ignore
console.log([]+ +[] + + + []);
console.log(`I have ${apple()} apples!`);
console.log(`I got array from juice; ${juice()}`);
console.log('Loaded a ts file;', __filename);