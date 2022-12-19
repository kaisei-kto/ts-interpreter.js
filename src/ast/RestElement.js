/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").RestElement} ast 
 */
module.exports = ast => {
	return `...${require(`./${ast.argument.type}`)(ast.argument)}`;
}