const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").UpdateExpression} ast 
 */
module.exports = ast => {
	// if (ast.prefix) {
	// 	console.log('update prefix!')
	// }

	return `${packages[ast.argument.type]((ast.argument.parent = ast) && ast.argument)}${ast.operator}`;
}