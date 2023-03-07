const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSOptionalType} ast 
 */
module.exports = ast => {
	return `${packages[ast.typeAnnotation.type]((ast.typeAnnotation.parent = ast) && ast.typeAnnotation)}?`;
};