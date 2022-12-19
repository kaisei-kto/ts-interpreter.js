/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").LabeledStatement} ast 
 */
module.exports = ast => {
	return `${require(`./${ast.label.type}`)(ast.label)}: ${require(`./${ast.body.type}`)(ast.body)}`;
}