'use strict';

// import './src/constants';
export * from './src/constants';
export * from './src/classes';
import './src/loop';
import './src/object';
import './src/labels';
import './src/operators';
import './src/functions';
import './src/functions';
import './src/functions';

// hello

let b = [];
let c = {
	d: []
}

export interface abcdef {}
interface abcde {}
export type abcd = () => []
type abc = () => [];
export function whoami(a?: string): string {
	function t(): Promise<abcd> {}
	return 'ts-interpreter.js';
}

console.log('Loaded a ts file;', __filename);

function a() {
	const b = []

	for (const [key, value] of b) {
		console.log(key, value)
	}

	if (true) {
		for (const [key, value] of b) {
			console.log(key, value)
		}
	}
}