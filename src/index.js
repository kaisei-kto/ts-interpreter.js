require('./vm');
const { packages } = require('./shared');
const { readdirSync } = require('node:fs');
const { join } = require('node:path');
const ast_path = join(__dirname, 'ast');

function create_runtime_string(str) {
	return `(function(){\n${str}\n;return module.exports})();`;
}

/**
 * 
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').Program} ast 
 */
function interpret(ast) {
	return create_runtime_string(Array.from(ast.body.keys()).map((_, idx) => {
		const object = ast.body[idx];
		const { type } = object;
		let fcall = packages[type];

		if (fcall) {
			let line = fcall(object);

			if (typeof line === 'string') {
				return line;
			}
		} else throw new ReferenceError(`${type} does not exist in the ast path`);
	}).join('\n'));
}

module.exports = {
	interpret,
	packages
};

for (const f of readdirSync(ast_path)) {
	packages[f.substr(0, f.length - 3)] = require(join(ast_path, f));
}