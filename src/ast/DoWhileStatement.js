const { packages } = require('../index');

/**
 * 
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').DoWhileStatement} ast
 */
module.exports = ast => {
	const test = packages[ast.test.type](ast.test);
	const body = packages[ast.body.type](ast.body);
	// return `do ${body.substr(0, body.length - 1)} while (${test});`;
	return `do ${body} while (${test});`;
};