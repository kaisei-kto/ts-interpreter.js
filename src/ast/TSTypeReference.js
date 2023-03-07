const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSTypeReference} ast 
 */
module.exports = ast => {
	let header = packages[ast.typeName.type]((ast.typeName.parent = ast) && ast.typeName);
	if (ast.typeParameters) {
		header += `<${ast.typeParameters.params.map(o => packages['TSTypeAnnotation']((o.parent = ast) && o)).join(', ')}>`;
	}

	return header;
};