const { packages } = require('../index');

/**
 *
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSTypeAnnotation} ast
 */
module.exports = (ast) => {
	const { typeAnnotation: annotation } = ast;
	const _annotation = annotation || ast;
	const type = _annotation.type;

	if (type === 'TSAnyKeyword') return 'any';
	if (type === 'TSUnknownKeyword') return 'unknown';
	if (type === 'TSStringKeyword') return 'string';
	if (type === 'TSNumberKeyword') return 'number';
	if (type === 'TSObjectKeyword') return 'object';
	if (type === 'TSBooleanKeyword') return 'boolean';
	if (type === 'TSVoidKeyword') return 'void';
	if (type === 'TSNullKeyword') return 'null';
	if (type === 'TSUndefinedKeyword') return 'undefined';
	if (type === 'TSNeverKeyword') return 'never';
	if (type === 'TSTypeReference') return packages['TSTypeReference']((_annotation.parent = ast) && _annotation);
	if (type === 'TSLiteralType')
		return packages[_annotation.literal.type]((_annotation.literal.parent = _annotation) && _annotation.literal);
	if (['TSTypeLiteral', 'TSTupleType', 'TSArrayType'].indexOf(type) !== -1)
		return packages[type]((_annotation.parent = ast) && _annotation);

	// console.log(ast);
	// console.log('found non-supported annotation', annotation);

	return packages[type]((_annotation.parent = ast) && _annotation);
};

for (const key of [
	'TSAnyKeyword',
	'TSStringKeyword',
	'TSNumberKeyword',
	'TSBooleanKeyword',
	'TSVoidKeyword',
	'TSNullKeyword',
	'TSUndefinedKeyword',
	'TSNeverKeyword',
	'TSUnknownKeyword',
	'TSObjectKeyword',
])
	packages[key] = module.exports;
