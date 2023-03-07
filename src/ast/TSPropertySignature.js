const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSPropertySignature} ast 
 */
module.exports = ast => {
	const name = packages[ast.key.type]((ast.key.parent = ast) && ast.key);
	let type = 'null';

	if (ast.typeAnnotation) {
		type = packages[ast.typeAnnotation.type]((ast.typeAnnotation.parent = ast) && ast.typeAnnotation);
	}

	if (ast.parent) {
		return `${name}: ${type}`;
	}

	return ['property', type, name];
};