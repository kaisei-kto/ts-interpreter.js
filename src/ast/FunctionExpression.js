const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").FunctionExpression} ast 
 */
module.exports = ast => {
	let builder = []
	if (ast.async) builder.push('async');
	builder.push('function');
	if (ast.generator) builder.push(builder.pop() + '*');
	if (ast.id) builder.push(packages[ast.id.type](ast.id));

	return `${builder.join(' ')} (${ast.params.map(o => packages[o.type]((o.parent = ast) && o)).join(', ')}) ${packages[ast.body.type]((ast.body.parent = ast) && ast.body)}`;
}