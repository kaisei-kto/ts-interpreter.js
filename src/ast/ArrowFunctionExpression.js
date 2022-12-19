/**
 * 
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').ArrowFunctionExpression} ast
 */
module.exports = ast => {
	return `${ast.async ? 'async ' : ''}(${ast.params.map(o => require(`./${o.type}`)(o)).join(', ')}) => ${ast.expression ? '(' : ''}${require(`./${ast.body.type}`)(ast.body)}${ast.expression ? ')' : ''}`
}