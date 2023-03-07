const { packages } = require('../index');

/**
 * 
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').TSEnumMember} ast
 */
module.exports = ast => {
	return `${ast.computed ? '[' : ''}${packages[ast.id.type]((ast.id.parent = ast) && ast.id)}${ast.computed ? ']' : ''}`;
};