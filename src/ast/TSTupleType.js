const { packages } = require('../index');

/**
 * 
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').TSTupleType} ast
 */
module.exports = ast => {
	return `[ ${ast.elementTypes.map(o => packages[o.type]((o.parent = ast) && o))} ]`;
};