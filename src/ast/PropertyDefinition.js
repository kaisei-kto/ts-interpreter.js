const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").PropertyDefinition} ast 
 */
module.exports = ast => {
	return `${ast.static ? 'static ' : ''}${ast.accessibility === 'private' ? '#' : ''}${packages[ast.key.type](ast.key)}${ast.value ? `= ${packages[ast.value.type](ast.value)}` : ''}`;
}