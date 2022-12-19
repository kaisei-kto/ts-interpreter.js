/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").CallExpression} ast 
 */
module.exports = ast => {
	const callee = require(`./${ast.callee.type}`)(ast.callee);
	
	return `${callee}(${ast.arguments.map(o => require(`./${o.type}`)(o)).join(', ')})`
}