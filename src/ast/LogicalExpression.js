/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").LogicalExpression} ast 
 */
module.exports = ast => {
	return `${require(`./${ast.left.type}`)(ast.left)} ${ast.operator} ${require(`./${ast.right.type}`)(ast.right)}`;
}