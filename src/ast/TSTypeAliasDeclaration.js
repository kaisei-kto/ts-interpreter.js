const { packages } = require('../index');
const { js_docs } = require('../utils');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSTypeAliasDeclaration} ast 
 */
module.exports = ast => {
	const identifier = packages[ast.id.type](ast.id);
	const body = []
	const types = packages[ast.typeAnnotation.type](ast.typeAnnotation);

	body.unshift([ 'typedef', undefined, identifier ]);
	body.unshift([ 'type', Array.isArray(types) ? `{${types}}` : types ]);
	if (ast.typeParameters) body.unshift([ 'template', packages[ast.typeParameters.type]((ast.typeParameters.parent = ast) && ast.typeParameters) ]);

	return !ast.parent ? js_docs(body) : body;
}