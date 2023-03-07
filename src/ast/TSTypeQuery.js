const { packages } = require('../index');

/**
 * 
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').TSTypeQuery} ast
 */
module.exports = ast => {
	return `typeof ${packages[ast.exprName.type]((ast.exprName.parent = ast) && ast.exprName)}`;
};