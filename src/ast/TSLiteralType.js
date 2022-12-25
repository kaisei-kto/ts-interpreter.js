const { packages } = require('../index');

/**
 * 
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').TSLiteralType} ast
 */
module.exports = ast => {
	return packages[ast.literal.type]((ast.literal.parent = ast) && ast.literal);
}