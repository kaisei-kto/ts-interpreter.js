import express from 'express';
export * from './src/constants';
export * from './src/classes';
import './src/loop';
import './src/object';
import './src/labels';
import './src/operators';
import './src/functions';
import './src/functions';
import './src/functions';
import assert from 'assert';

const a = {};

const app = express()

app.listen(8080)

const b = function() {
	function c() {
		function d() {
			console.log((() => { (cc + 5)() })(), c + f);
			b['		']();
		}
		d();
	}
	c();
}

export function whoami() {
	// b();
	return 'ts-interpreter.js';
}

setTimeout(() => {
	process.exit(1)
}, 2000)

// assert(false);

console.log('Loaded a ts file;', __filename);