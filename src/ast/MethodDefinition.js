const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").MethodDefinition} ast 
 */
module.exports = ast => {
	return `${['method', 'constructor'].indexOf(ast.kind) === -1 ? ast.kind + ' ' : ''}${packages[ast.value.type](ast.value).replace('function (', `${ast.key.name}(`)}`;
}