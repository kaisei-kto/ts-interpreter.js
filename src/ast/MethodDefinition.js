/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").MethodDefinition} ast 
 */
module.exports = ast => {
	return `${require(`./${ast.value.type}`)(ast.value).replace('function (', `${ast.key.name}(`)}`;
}