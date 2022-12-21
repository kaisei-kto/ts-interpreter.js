const { packages } = require('../index');

/**
 * 
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').ArrowFunctionExpression} ast
 */
module.exports = ast => {
	const params = ast.params.map(o => packages[o.type]((o.parent = ast) && o)).join(', ');
	let body = packages[ast.body.type]((ast.body.parent = ast) && ast.body);
	body = `${ast.expression ? '(' : ''}${body}${ast.expression ? ')' : ''}`;

	return `(${ast.async ? 'async ' : ''}(${params}) => ${body})`;
}