const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ThrowStatement} ast 
 */
module.exports = ast => {
	const v = packages[ast.argument.type]((ast.argument.parent = ast) && ast.argument);

	if (Array.isArray(v)) {
		return `require('assert')(false, ${v.pop()});`;
	}

	return `require('assert')(false, ${ast.argument ? ' ' + v : ''});`;
};