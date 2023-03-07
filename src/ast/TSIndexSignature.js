const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSIndexSignature} ast 
 */
module.exports = ast => {
	const params = ast.parameters.map(o => {
		const identifier = packages[o.type]((o.parent = ast) && o);
		if (o.typeAnnotation) {
			// console.log(o)
			return `${identifier}${o.optional ? '?' : ''}: ${packages[o.typeAnnotation.type]((o.typeAnnotation.parent = ast) && o.typeAnnotation)}`;
		}

		return 'identifier';
	});

	// console.log(params);
	// if (ast.typeAnnotation) {
	// return `[${params[0]}]:${packages[ast.typeAnnotation.type](ast.typeAnnotation)}`;
	// return;
	// }

	// prone to mess up for the most part, ill look into this whenever i have enough time
	return params;
};