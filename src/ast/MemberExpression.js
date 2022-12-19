/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").MemberExpression} ast 
 */
module.exports = ast => {
	let property = require(`./${ast.property.type}`)(ast.property);

	if (ast.computed) property = `[${property}]`
	else property = `${ast.optional ? '?' : ''}.${property}`

	return `${require(`./${ast.object.type}`)(ast.object)}${property}`
}