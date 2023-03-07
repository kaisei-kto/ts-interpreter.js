const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSConstructSignatureDeclaration} ast 
 */
module.exports = ast => {
	return `new(${ast.params.map(o => {
		let identifier = packages[o.type]((o.parent = ast) && o);
		let type = o.typeAnnotation ? packages[o.typeAnnotation.type]((o.typeAnnotation.parent = o) && o.typeAnnotation) : null;
		if (type) {
			return `${identifier}: ${packages[o.typeAnnotation.type]((o.typeAnnotation.parent = o) && o.typeAnnotation)}`;
		}

		return identifier;
	}).join(', ')})`;
};