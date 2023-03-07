const { packages } = require('../index');

/**
 * 
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').WhileStatement} ast
 */
module.exports = ast => {
	const test = packages[ast.test.type]((ast.test.parent = ast) && ast.test);

	return `while (${test}) ${packages[ast.body.type](ast.body)}`;
};