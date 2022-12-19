/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSTypeAliasDeclaration} ast 
 */
module.exports = ast => {
	const identifier = require(`./${ast.id.type}`)(ast.id);
	const body = []
	const types = require(`./${ast.typeAnnotation.type}`)(ast.typeAnnotation);

	body.unshift([ 'typedef', undefined, identifier ]);
	body.unshift([ 'type', types ]);

	return body;
}