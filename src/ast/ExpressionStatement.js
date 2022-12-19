/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ExpressionStatement} ast 
 */
module.exports = ast => {
	return require(`./${ast.expression.type}`)(ast.expression)
}