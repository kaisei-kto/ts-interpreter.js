/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ObjectExpression} ast 
 */
module.exports = ast => {
	return ast.properties.length > 0 ? `{ ${ast.properties.map(o => require(`./${o.type}`)(o))} }` : '{}'
}