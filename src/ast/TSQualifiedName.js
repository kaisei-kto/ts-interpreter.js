/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSQualifiedName} ast 
 */
module.exports = ast => {
	return `${require(`./${ast.left.type}`)(ast.type)}.${require(`./${ast.right.type}`)(ast.right)}`;
}