#!/usr/bin/env node
const compile = require('./')();
const { outputFileSync, readFileSync, readdirSync, existsSync, rmdirSync, mkdirSync, lstatSync } = require('fs-extra');
const { join } = require('path');
const { log } = require('./src/utils');

const cmds = [
	'file        : tsi-cli <input.ts> <out.js>',
	'auto        : tsi-cli <input.ts> - # replaces - to <input.ts>.js',
	'console     : tsi-cli <input.ts> --',
	// 'project     : tsi-cli project',
	'project-dist: tsi-cli project-dist'
]
// Get rid of the first 2 arguments which is not needed
process.argv.splice(0, 2);

const [ipath, opath] = process.argv;
function interpret(src, dest) {
	log.debug(`Reading and compiling \x1b[1m${src}\x1b[0m to \x1b[1mJavaScript\x1b[0m`);
	const start = Date.now();
	const ccode = compile(src);
	const end = Date.now();

	let path = dest + '.js';

	outputFileSync(path, ccode);
	return log.debug(`Successfully compiled in \x1b[1m${end - start} ms\x1b[0m and saved to \x1b[1m${path}\x1b[0m`);
}

function recursive(path = '.') {
	const files = [];

	for (let fd of readdirSync(path)) {
		if ([
			'.git',
			'node_modules',
			'.gitignore',
			'.npmignore',
			'.gitattributes',
			'.vscode'
		].indexOf(fd) + 1) continue;
		const dpath = join(path, fd);
		const stat = lstatSync(dpath);

		if (stat.isFile() && (
			fd.endsWith('.js')
			||
			(fd.endsWith('.ts'))
		)) {
			files.push(dpath);
		}

		if (stat.isDirectory()) {
			files.push(...recursive(dpath));
		}
	}

	return files;
}

if (ipath === 'project-dist') {
	if (existsSync('ts-interpreter.js-dist')) {
		rmdirSync('ts-interpreter.js-dist', { recursive: true });
	}

	mkdirSync('ts-interpreter.js-dist');

	const files = recursive();

	for (const file of files) {
		if (file.endsWith('.ts') && !file.endsWith('.d.ts')) {
			// console.log(file);
			interpret(file, join('ts-interpreter.js-dist', file.substr(0, file.lastIndexOf('.'))));
		} else {
			outputFileSync(join('ts-interpreter.js-dist', file), readFileSync(file, 'utf8'));
		}
	}
	return;
}

if (typeof ipath === 'string' && typeof opath === 'string') {
	if (opath === '--') return console.log(compile(ipath));

	return interpret(ipath, opath === '-' ? ipath : opath);
}

log.error(`Failed to interpret the commands;\n${cmds.join('\n')}`);