/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").VariableDeclaration} ast 
 */
module.exports = (ast) => {
	return ast.type !== 'VariableDeclaration' ? require(`./${ast.type}`)(ast) : `${!ast.parent ? ast.kind + ' ' : ''}${ast.declarations.map(o => require(`./${o.type}`)((o.parent = ast) && o)).join(', ')}`
}