const { packages } = require('../index');
const { js_docs } = require('../utils');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").FunctionExpression} ast 
 */
module.exports = ast => {
	let builder = [];
	if (ast.async) builder.push('async');
	builder.push('function');
	if (ast.generator) builder.push(builder.pop() + '*');
	if (ast.id) builder.push(packages[ast.id.type]((ast.id.parent = ast) && ast.id));

	let docs = [];
	for (const parameter of ast.params) {
		docs.push(['param', (parameter.typeAnnotation ? packages[parameter.typeAnnotation.type](parameter.typeAnnotation) : 'any') + (parameter.optional ? '?' : ''), parameter.name]);
	}

	if (ast.returnType) {
		docs.push(['returns', packages[ast.returnType.typeAnnotation.type](ast.returnType.typeAnnotation)]);
	}

	docs = docs.length > 0 ? js_docs(docs) : '';
	const array = [docs, `${builder.join(' ')} (${ast.params.map(o => packages[o.type]((o.parent = ast) && o)).join(', ')}) ${packages[ast.body.type]((ast.body.parent = ast) && ast.body)}`];

	if (ast.parent) {
		return array;
	}

	array[1] = `;(${array[1]});`;
	return array[0] !== '' ? array.join('\n') : array.pop();
};