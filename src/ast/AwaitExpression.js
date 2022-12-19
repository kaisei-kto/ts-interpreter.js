/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").AwaitExpression} ast 
 */
module.exports = ast => {
	return `await ${require(`./${ast.argument.type}`)(ast.argument)}`;
}