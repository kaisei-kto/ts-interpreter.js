/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ConditionalExpression} ast 
 */
module.exports = ast => {
	return `${require(`./${ast.test.type}`)(ast.test)} ? ${require(`./${ast.consequent.type}`)(ast.consequent)} : ${require(`./${ast.alternate.type}`)(ast.alternate)}`
}