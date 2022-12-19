/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ReturnStatement} ast 
 */
module.exports = ast => {
	return `return${ast.argument ? ' ' + require(`./${ast.argument.type}`)(ast.argument) : ''}`
}