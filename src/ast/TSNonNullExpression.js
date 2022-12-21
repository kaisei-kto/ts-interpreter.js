const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSNonNullExpression} ast 
 */
module.exports = ast => {
	return packages[ast.expression.type](ast.expression);
}