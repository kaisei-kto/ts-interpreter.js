const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ArrayExpression} ast 
 */
module.exports = ast => {
	return `[ ${ast.elements.map(o => packages[o.type](o)).join(', ')} ]`
}