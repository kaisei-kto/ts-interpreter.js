const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSTypeOperator} ast 
 */
module.exports = ast => {
	return `${ast.operator}${ast.typeAnnotation ? ` ${packages[ast.typeAnnotation.type]((ast.typeAnnotation.parent = ast) && ast.typeAnnotation)}` : ''}`;
};