const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSTypeAnnotation} ast 
 */
module.exports = ast => {
	const { typeAnnotation: annotation } = ast;
	const _annotation = annotation || ast;
	const type = _annotation.type;
	const typeName = _annotation.typeName;

	if (type === 'TSAnyKeyword') return 'any';
	if (type === 'TSStringKeyword') return 'string';
	if (type === 'TSNumberKeyword') return 'number';
	if (type === 'TSBooleanKeyword') return 'boolean';
	if (type === 'TSVoidKeyword') return 'void';
	if (type === 'TSNullKeyword') return 'null';
	if (type === 'TSUndefinedKeyword') return 'undefined';
	if (type === 'TSTypeReference') return packages['TSTypeReference'](annotation || ast);
	if (type === 'TSLiteralType') return packages[_annotation.literal.type](_annotation.literal)
	if (type === 'TSTypeOperator') return annotation.operator;
	if ([ 'TSTypeLiteral', 'TSTupleType', 'TSArrayType' ].indexOf(type) !== -1) return packages[type]((_annotation.parent = ast) && _annotation);
	if (type === 'TSFunctionType') {
		return `() => ${module.exports(annotation.returnType)}`;
	}

	// console.log(ast);
	// console.log('found non-supported annotation', annotation);

	return packages[type](_annotation)
}

for (const key of [
	'TSTypeOperator',
	'TSAnyKeyword', 'TSStringKeyword', 'TSNumberKeyword',
	'TSBooleanKeyword', 'TSVoidKeyword', 'TSNullKeyword',
	'TSUndefinedKeyword'
]) packages[key] = module.exports;