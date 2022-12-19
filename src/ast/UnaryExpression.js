/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").UnaryExpression} ast 
 */
module.exports = ast => {
	return `${ast.operator}${require(`./${ast.argument.type}`)(ast.argument)}`;
}