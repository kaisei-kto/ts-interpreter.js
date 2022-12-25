#!/usr/bin/env node
const compile = require('./')();
const { writeFileSync } = require('fs');
const { log } = require('./src/utils');

const cmds = [
	'file   : tsi-cli <input.ts> <out.js>',
	'auto   : tsi-cli <input.ts> - # replaces - to <input.ts>.js',
	'console: tsi-cli <input.ts> --'
]
// Get rid of the first 2 arguments which is not needed
process.argv.splice(0, 2);

const [ ipath, opath ] = process.argv;

if (typeof ipath === 'string' && typeof opath === 'string') {
	if (opath === '--') return console.log(compile(ipath));

	log.debug(`Reading and compiling \x1b[1m${ipath}\x1b[0m to \x1b[1mJavaScript\x1b[0m`);
	const start = Date.now();
	const ccode = compile(ipath);
	const end = Date.now();

	let path = opath === '-' ? ipath + '.js' : opath;

	writeFileSync(path, ccode);
	return log.debug(`Successfully compiled in \x1b[1m${end-start} ms\x1b[0m and saved to \x1b[1m${path}\x1b[0m`);
}

log.error(`Failed to interpret the commands;\n${cmds.join('\n')}`);