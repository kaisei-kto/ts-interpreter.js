/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ObjectPattern} ast 
 */
module.exports = ast => {
	return `{ ${ast.properties.map(o => require(`./${o.type}`)(o)).join(', ')} }`
}