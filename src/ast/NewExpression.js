const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").NewExpression} ast 
 */
module.exports = ast => {
	return `new ${packages[ast.callee.type](ast.callee)}(${ast.arguments.map(o => packages[o.type](o)).join(', ')})`
}