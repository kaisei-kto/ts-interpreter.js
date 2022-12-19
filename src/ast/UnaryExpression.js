/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").UnaryExpression} ast 
 */
module.exports = ast => {
	// const wrap = ['void', 'typeof', 'delete'].indexOf(ast.operator) !== -1;
	return `${ast.operator}(${require(`./${ast.argument.type}`)(ast.argument)})`;
}