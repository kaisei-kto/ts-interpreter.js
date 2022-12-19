/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TaggedTemplateExpression} ast 
 */
module.exports = ast => {
	return `${require(`./${ast.tag.type}`)(ast.tag)}${require(`./${ast.quasi.type}`)(ast.quasi)}`
}