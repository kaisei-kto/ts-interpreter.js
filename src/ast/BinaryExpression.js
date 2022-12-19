/**
 * 
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').BinaryExpression} ast
 */
module.exports = ast => {
	const left = require(`./${ast.left.type}`)(ast.left);
	const right = require(`./${ast.right.type}`)(ast.right);

	return `${left} ${ast.operator} ${right}`
}