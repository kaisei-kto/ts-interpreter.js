/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").FunctionExpression} ast 
 */
module.exports = ast => {
	let builder = []
	if (ast.async) builder.push('async');
	builder.push('function');
	if (ast.generator) builder.push(builder.pop() + '*');
	if (ast.id) builder.push(require(`./${ast.id.type}`)(ast.id));

	return `${builder.join(' ')} (${ast.params.map(o => require(`./${o.type}`)(o)).join(', ')}) ${require(`./${ast.body.type}`)(ast.body)}`;
}