/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").MethodDefinition} ast 
 */
module.exports = ast => {
	return `${['method', 'constructor'].indexOf(ast.kind) === -1 ? ast.kind + ' ' : ''}${require(`./${ast.value.type}`)(ast.value).replace('function (', `${ast.key.name}(`)}`;
}