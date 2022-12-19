/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").PropertyDefinition} ast 
 */
module.exports = ast => {
	return `${ast.static ? 'static ' : ''}${ast.accessibility === 'private' ? '#' : ''}${require(`./${ast.key.type}`)(ast.key)}${ast.value ? `= ${require(`./${ast.value.type}`)(ast.value)}` : ''}`;
}