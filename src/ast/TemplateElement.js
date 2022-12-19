/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TemplateElement} ast 
 */
module.exports = ast => {
	return ast.value.raw
}