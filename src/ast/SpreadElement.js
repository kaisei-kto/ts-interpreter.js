/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").SpreadElement} ast 
 */
module.exports = ast => {
	return `...${require(`./${ast.argument.type}`)(ast.argument)}`
}