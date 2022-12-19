/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").NewExpression} ast 
 */
module.exports = ast => {
	return `new ${require(`./${ast.callee.type}`)(ast.callee)}(${ast.arguments.map(o => require(`./${o.type}`)(o)).join(', ')})`
}