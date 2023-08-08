#!/usr/bin/env node
const compile = require('./')();
const { rmSync } = require('fs');
const { outputFileSync, readFileSync, readdirSync, existsSync, mkdirSync, lstatSync } = require('fs-extra');
const { join, resolve, dirname } = require('path');
const { log } = require('./src/utils');

const tag = `/**
  * TS2JS conversion by ts-interpreter.js
  * @link https://github.com/kaisei-kto/ts-interpreter.js
  */`;

const cmds = [
	'file        : tsi-cli <input.ts> <out.js>',
	'auto        : tsi-cli <input.ts> - # replaces - to <input.ts>.js',
	'console     : tsi-cli <input.ts> --',
	// 'project     : tsi-cli project',
	'project-dist: tsi-cli project-dist',
	'run         : tsi-cli run <input.js/input.ts>'
];
// Get rid of the first 2 arguments which is not needed
process.argv.splice(0, 2);

let [ipath, opath] = process.argv;

if (typeof opath !== 'string') opath = '--';

function interpret(src, dest) {
	log.debug(`Reading and compiling \x1b[1m${src}\x1b[0m to \x1b[1mJavaScript\x1b[0m`);
	const start = Date.now();
	const ccode = compile(src);
	const end = Date.now();

	let path = dest + '.js';

	outputFileSync(path, `${tag}\n\n${ccode}`);
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

if ([
	'--help',
	'-h',
	'-help'
].indexOf(ipath?.toLowerCase()) + 1) return log.info(`\n${cmds.join('\n')}`);

if (ipath === 'project-dist') {
	if (existsSync('ts-interpreter.js-dist')) rmSync('ts-interpreter.js-dist', { recursive: true, force: true });

	mkdirSync('ts-interpreter.js-dist');

	const files = recursive();

	for (const file of files) {
		if (file.endsWith('.ts') && !file.endsWith('.d.ts')) {
			const path = join('ts-interpreter.js-dist', file);
			interpret(file, path.substr(0, path.lastIndexOf('.')));
		} else {
			outputFileSync(join('ts-interpreter.js-dist', file), readFileSync(file, 'utf8'));
		}
	}
	return;
}

if (ipath === 'run' && typeof opath === 'string') {
	if (opath === '.') 
	{
		if (!existsSync('package.json'))
			return log.error('package.json does not exist in the working directory!');

		opath = resolve(require(join(process.cwd(), 'package.json')).main);

		if (!(opath.endsWith('.js') || opath.endsWith('.ts')))
			opath += existsSync(`${opath}.js`) ? '.js' : '.ts';
	}

	opath = resolve(opath);

	if (opath.endsWith('.d.ts'))
		return log.error('A type declaration file cannot be compiled & run');

	if (opath.endsWith('.ts'))
		log.debug(`Running after compiling \x1b[1m${opath}\x1b[0m to \x1b[1mJavaScript\x1b[0m`);

	process.chdir(dirname(opath));
	return require(opath);
}

if (typeof ipath === 'string' && typeof opath === 'string') {
	if (opath === '--') return console.log(compile(ipath));

	return interpret(ipath, opath === '-' ? ipath : opath);
}

log.error(`Failed to interpret the commands;\n${cmds.join('\n')}`);