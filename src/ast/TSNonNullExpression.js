const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSNonNullExpression} ast 
 */
module.exports = ast => {
	// [member!]
	return packages[ast.expression.type]((ast.expression.parent = ast) && ast.expression);
};