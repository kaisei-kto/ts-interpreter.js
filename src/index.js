const { existsSync } = require('node:fs');
const { resolve } = require('path');
const { minify } = require('uglify-js');
const prettier = require('./prettier');

/**
 * 
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').ProgramStatement[]} ast 
 */
function interpret(ast, opts) {
	const code = [];

	for (const object of ast) {
		const { type } = object;
		const fpath = resolve(__dirname, 'ast', type + '.js');
		let fcall;

		if (fcall = (existsSync(fpath) ? require(fpath) : false)) {
			const line = fcall(object);

			// console.log(line);
			if (typeof line === 'string') code.push(line);
		}
		else throw new ReferenceError(`${type} does not exist in the ast path`);
	}

	const joined = code.join('\n');

	return opts.pretty ? prettier.js_beautify(joined, {
		indent_size: 4,
		indent_char: '\t'
	}) : minify(joined).code;
}

module.exports = {
	interpret
};