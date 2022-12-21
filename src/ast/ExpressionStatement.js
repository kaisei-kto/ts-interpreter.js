const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ExpressionStatement} ast 
 */
module.exports = ast => {
	return packages[ast.expression.type](ast.expression)
}