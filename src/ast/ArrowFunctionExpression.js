const { packages } = require('../index');
const { js_docs } = require('../utils');

/**
 *
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').ArrowFunctionExpression} ast
 */
module.exports = (ast) => {
	const params = ast.params.map((o) => packages[o.type]((o.parent = ast) && o)).join(', ');
	let body = packages[ast.body.type]((ast.body.parent = ast) && ast.body);
	body = `${ast.expression ? '(' : ''}${body}${ast.expression ? ')' : ''}`;

	let docs = [];
	for (const parameter of ast.params) {
		docs.push(['param', (parameter.typeAnnotation ? packages[parameter.typeAnnotation.type](parameter.typeAnnotation) : 'any') + (parameter.optional ? '?' : ''), parameter.name]);
	}

	if (ast.returnType) {
		docs.push(['returns', packages[ast.returnType.typeAnnotation.type](ast.returnType.typeAnnotation)]);
	}

	docs = docs.length > 0 ? js_docs(docs) : '';
	const array = [docs, `(${ast.async ? 'async ' : ''}(${params}) => ${body})`];

	if (ast.parent) {
		return array;
	}

	return array[0] !== '' ? array.join('\n') : array.pop();
};
