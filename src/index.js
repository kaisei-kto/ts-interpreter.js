const { packages, cache } = require('./shared');
const { readdirSync } = require('node:fs');
const { join } = require('node:path');
const ast_path = join(__dirname, 'ast');

/**
 * 
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').ProgramStatement[]} ast 
 */
function interpret(ast) {
	const code = [];

	for (const object of ast) {
		const { type } = object;
		let fcall = packages[type];

		if (fcall) {
			const line = fcall(object);

			if (typeof line === 'string') {
				// log(type, 'error');
				// console.log(line);
				code.push(line);
			}
		} else throw new ReferenceError(`${type} does not exist in the ast path`);
	}

	const joined = code.join('\n');

	return joined;
}

module.exports = {
	interpret,
	packages
};

for (const f of readdirSync(ast_path)) {
	packages[f.substr(0, f.length - 3)] = require(join(ast_path, f));
}