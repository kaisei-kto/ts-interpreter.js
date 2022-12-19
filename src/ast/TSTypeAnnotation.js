/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSTypeAnnotation} ast 
 */
module.exports = ast => {
	const { typeAnnotation: annotation } = ast;
	const _annotation = annotation || ast;
	const type = _annotation.type;
	const typeName = _annotation.typeName;

	if (type === 'TSStringKeyword') return 'string';
	if (type === 'TSNumberKeyword') return 'number';
	if (type === 'TSBooleanKeyword') return 'boolean';
	if (type === 'TSVoidKeyword') return 'void';
	if (type === 'TSNullKeyword') return 'null';
	if (type === 'TSUndefinedKeyword') return 'undefined';
	if (type === 'TSTypeReference') return require('./TSTypeReference')(annotation || ast);
	if (type === 'TSLiteralType') return require(`./${_annotation.literal.type}`)(_annotation.literal)
	if (type === 'TSArrayType') return `${module.exports(annotation.elementType)}[]`;
	if (type === 'TSTypeOperator') return annotation.operator;
	if (type === 'TSFunctionType') {
		return `() => ${module.exports(annotation.returnType)}`;
	}

	console.log(ast);
	console.log('found non-supported annotation', annotation);
}