const { packages } = require('../index');

/**
 * 
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').BinaryExpression} ast
 */
module.exports = ast => {
	const left = packages[ast.left.type]((ast.left.parent = ast) && ast.left);
	const right = packages[ast.right.type]((ast.right.parent = ast) && ast.right);

	return `${left} ${ast.operator} ${right}`
}