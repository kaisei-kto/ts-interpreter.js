const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ObjectPattern} ast 
 */
module.exports = ast => {
	return `{ ${ast.properties.map(o => packages[o.type](o)).join(', ')} }`
}