/**
 * 
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').DoWhileStatement} ast
 */
module.exports = ast => {
	const test = require(`./${ast.test.type}`)(ast.test);

	return `do ${require(`./${ast.body.type}`)(ast.body)} while (${test})`;
}