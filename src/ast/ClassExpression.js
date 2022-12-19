/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ClassExpression} ast 
 */
module.exports = ast => {
	return `class${ast.id ? ' ' + require(`./${ast.id.type}`)(ast.id) : ''} ${require(`./${ast.body.type}`)(ast.body)}`;
}