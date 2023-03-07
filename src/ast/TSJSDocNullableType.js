const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSJSDocNullableType} ast 
 */
module.exports = ast => {
	if (ast.typeAnnotation) {
		return packages[ast.typeAnnotation.type]((ast.typeAnnotation.parent = ast) && ast.typeAnnotation);
	}
};