const { packages } = require('../index');
const { js_docs } = require('../utils');

const BlockStatement = require('./BlockStatement');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").FunctionDeclaration} ast 
 */
module.exports = (ast) => {
	let fheader = `${ast.async ? 'async ' : ''}function${ast.generator ? '*' : ''}`;
	let fparams = ast.params.map(o => packages[o.type]((o.parent = ast) && o)).join(', ');

	if (ast.parent) {
		fheader = `${ast.id.name} = ${fheader}`;
	} else {
		fheader = `${fheader} ${ast.id ? ast.id.name : ''}`;
	}

	let docs = [];
	for (const parameter of ast.params) {
		docs.push([ 'param', (parameter.typeAnnotation ? packages[parameter.typeAnnotation.type](parameter.typeAnnotation) : 'any') + (parameter.optional ? '?' : ''), parameter.name ]);
	}

	if (ast.returnType) {
		docs.push([ 'returns', packages[ast.returnType.typeAnnotation.type](ast.returnType.typeAnnotation) ]);
	}

	docs = docs.length > 0 ? js_docs(docs) : '';

	const array = [ docs, `${fheader}(${fparams}) ${BlockStatement(ast.body)}` ];

	if (ast.parent) {
		return array;
	}

	return array[0] !== '' ? array.join('\n') : array.pop();
}