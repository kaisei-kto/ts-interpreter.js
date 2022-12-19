/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").UpdateExpression} ast 
 */
module.exports = ast => {
	// if (ast.prefix) {
	// 	console.log('update prefix!')
	// }

	return `${require(`./${ast.argument.type}`)(ast.argument)}${ast.operator}`;
}