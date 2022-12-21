const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").AssignmentExpression} ast 
 */
module.exports = ast => {
	return `${packages[ast.left.type](ast.left)} ${ast.operator} ${packages[ast.right.type](ast.right)}`;
}