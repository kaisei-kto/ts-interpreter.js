const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").NewExpression} ast 
 */
module.exports = ast => {
	return `new ${packages[ast.callee.type]((ast.callee.parent = ast.callee))}(${ast.arguments.map(o => {
		const value = packages[o.type]((o.parent = ast) && o)

		if (Array.isArray(value)) return value.join('\n');

		return value;
	}).join(', ')})`
}