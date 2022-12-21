const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ReturnStatement} ast 
 */
module.exports = ast => {
	return `return${ast.argument ? ' ' + packages[ast.argument.type]((ast.argument.parent = ast) && ast.argument) : ''}`
}