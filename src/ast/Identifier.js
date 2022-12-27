const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").Identifier} ast 
 */
module.exports = ast => {
	return `${ast.name}${!ast.parent ? ';' : ''}`
}