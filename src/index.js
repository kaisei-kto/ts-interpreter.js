require('./vm');
const { packages } = require('./shared');
const { readdirSync } = require('node:fs');
const { join } = require('node:path');
const ast_path = join(__dirname, 'ast');

function create_runtime_string(str) {
	// return `(function(){\n${str}\n;return module.exports})();`;
	return str;
}

/**
 *
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').Program} ast
 */
function interpret(ast) {
	require('./shared').comments = ast.comments;

	let body = Array.from(ast.body.keys())
		.map((_, idx) => {
			const object = ast.body[idx];
			const { type } = object;
			let fcall = packages[type];

			if (fcall) {
				let line = fcall(object);

				if (typeof line === 'string') {
					// if (line.indexOf('[object Object]') !== -1) console.log(object);
					return line;
				} else if (typeof line === 'object' && 'declaration' in line) {
					const { typings, declaration } = line;
					return `${typeof typings === 'string' ? typings + '\n' : ''}${declaration}`;
				} else if (typeof line === 'object' && Array.isArray(line)) {
					return line
						.map(
							({ typings, declaration }) =>
								`${typeof typings === 'string' ? typings + '\n' : ''}${declaration}`,
						)
						.join('\n');
				}
			} else throw new ReferenceError(`${type} does not exist in the ast path`);
		})
		.join('\n')
		.split('\n');

	// for (const comment of (ast.comments || [])) {
	// 	const { start } = comment.loc;
	// 	const { type, value } = comment;

	// 	let i = 1;
	// 	console.log(value);
	// 	for (const line of body) {
	// 		if (start.line === i) {
	// 			console.log('here');
	// 			if (type === 'Line') {
	// 				body[i] = start.column === 0 ? `//${value}\n${body[i]}` : `${body[i]}//${value}`;
	// 				break;
	// 			}
	// 		}

	// 		i++;
	// 	}
	// }

	return create_runtime_string(body.join('\n'));
}

module.exports = {
	interpret,
	packages,
};

for (const f of readdirSync(ast_path)) {
	packages[f.substr(0, f.length - 3)] = require(join(ast_path, f));
}
