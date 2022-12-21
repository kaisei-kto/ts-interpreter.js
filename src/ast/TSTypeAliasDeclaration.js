const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSTypeAliasDeclaration} ast 
 */
module.exports = ast => {
	const identifier = packages[ast.id.type](ast.id);
	const body = []
	const types = packages[ast.typeAnnotation.type](ast.typeAnnotation);

	body.unshift([ 'typedef', undefined, identifier ]);
	body.unshift([ 'type', types ]);

	return body;
}