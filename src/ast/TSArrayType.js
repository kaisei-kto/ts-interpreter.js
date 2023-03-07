const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSArrayType} ast 
 */
module.exports = ast => {
	return `${packages['TSTypeAnnotation'](ast.elementType)}[]`;
};