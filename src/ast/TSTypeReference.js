/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSTypeReference} ast 
 */
module.exports = ast => {
	let header = require(`./${ast.typeName.type}`)(ast.typeName);
	if (ast.typeParameters) {
		header += `<${ast.typeParameters.params.map(o => require('./TSTypeAnnotation')(o)).join(', ')}>`;
	}

	return header;
}