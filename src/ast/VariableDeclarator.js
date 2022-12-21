const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").VariableDeclarator} ast 
 */
module.exports = ast => {
	return `${packages[ast.id.type](ast.id)}${ast.init ? ` = ${packages[ast.init.type](ast.init)}` : ''}`
}