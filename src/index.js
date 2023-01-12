require('./vm');
const { packages } = require('./shared');
const { readdirSync } = require('node:fs');
const { join } = require('node:path');
const ast_path = join(__dirname, 'ast');

function create_runtime_string(str) {
	return `(function(){\n${str}\n;return module.exports})();`
}

/**
 * 
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').Program} ast 
 */
function interpret(ast) {
	const code = [];

	for (const object of ast.body) {
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

	return create_runtime_string(joined);
}

module.exports = {
	interpret,
	packages
};

for (const f of readdirSync(ast_path)) {
	packages[f.substr(0, f.length - 3)] = require(join(ast_path, f));
}