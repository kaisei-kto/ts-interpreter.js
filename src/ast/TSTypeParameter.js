/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSTypeParameter} ast 
 */
module.exports = ast => {
	return require(`./${ast.name.type}`)(ast.name)
}