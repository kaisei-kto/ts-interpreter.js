/**
 * 
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').WhileStatement} ast
 */
module.exports = ast => {
	const test = require(`./${ast.test.type}`)(ast.test);

	return `while (${test}) ${require(`./${ast.body.type}`)(ast.body)}`;
}