const { packages } = require('../index');

/**
 * 
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').TSTypeLiteral} ast
 */
module.exports = ast => {
	return `{ ${ast.members.map(o => packages[o.type]((o.parent = ast) && o))} }`;
};