const { packages } = require('../index');

/**
 *
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").MethodDefinition} ast
 */
module.exports = (ast) => {
	const value = packages[ast.value.type]((ast.value.parent = ast) && ast.value);
	let header = Array.isArray(value) ? value.shift() + '\n' : '';
	let body = Array.isArray(value) ? value.shift() : '';

	return `${header}${ast.static ? 'static ' : ''}${['method', 'constructor'].indexOf(ast.kind) === -1 ? ast.kind + ' ' : ''}${body.replace('function (', `${ast.key.name}(`)}`;
};
