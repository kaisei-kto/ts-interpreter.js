const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSQualifiedName} ast 
 */
module.exports = ast => {
	return `${packages[ast.left.type]((ast.left.parent = ast) && ast.left)}.${packages[ast.right.type]((ast.right.parent = ast) && ast.right)}`;
};