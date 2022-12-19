/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").VariableDeclarator} ast 
 */
module.exports = ast => {
	return `${require(`./${ast.id.type}`)(ast.id)}${ast.init ? ` = ${require(`./${ast.init.type}`)(ast.init)}` : ''}`
}