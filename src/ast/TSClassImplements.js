/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSClassImplements} ast 
 */
module.exports = ast => {
	return require(`./${ast.expression.type}`)(ast.expression);
}