/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").PropertyDefinition} ast 
 */
module.exports = ast => {
	return `${ast.accessibility === 'private' ? '#' : ''}${require(`./${ast.key.type}`)(ast.key)}`
}