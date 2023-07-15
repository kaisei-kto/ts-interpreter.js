const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ExpressionStatement} ast 
 */
module.exports = ast => {
	const value = packages[ast.expression.type](ast.expression);

	if (['FunctionDeclaration', 'ArrowFunctionExpression'].indexOf(ast.expression.type) !== -1) {
		if (typeof value !== 'string') {
			return `${value[0]}${value[1]}`;
		}

		return value;
	}

	return value;
};