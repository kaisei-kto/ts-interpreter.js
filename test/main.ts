// 'use strict';

// // import './src/constants';
// export * from './src/constants';
// export * from './src/classes';
// import './src/loop';
// import './src/object';
// import './src/labels';
// import './src/operators';
// import './src/functions';
// import './src/functions';
// import './src/functions';

// // hello

// let b = [];
// let c = {
// 	d: []
// }

// export interface abcdef {}
// interface abcde {}
// export type abcd = () => []
// type abc = () => [];
// export function whoami(a?: string): string {
// 	function t(): Promise<abcd> {}
// 	return 'ts-interpreter.js';
// }

// console.log('Loaded a ts file;', __filename);

const opts = {
	limits: {
		fileSize: 81e6,
		files: 1
	},
	limitHandler: function (req, res) {
		return res.status(413).send();
	},
	uploadTimeout: 360_000
}