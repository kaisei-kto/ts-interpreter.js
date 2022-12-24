const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ThrowStatement} ast 
 */
module.exports = ast => {
	return `require('assert')(false, ${ast.argument ? ' ' + packages[ast.argument.type]((ast.argument.parent = ast) && ast.argument) : ''});`;
}