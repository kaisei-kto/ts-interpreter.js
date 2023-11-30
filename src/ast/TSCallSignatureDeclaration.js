const caller = require('caller');
const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSCallSignatureDeclaration} ast 
 */
module.exports = ast => {
	// return `(${ast.params.map(o => {
	// 	let identifier = packages[o.type]((o.parent = ast) && o);
	// 	let type = o.typeAnnotation ? packages[o.typeAnnotation.type]((o.typeAnnotation.parent = o) && o.typeAnnotation) : null;
	// 	if (type) {
	// 		return `${identifier}${o.optional ? '?' : ''}: ${packages[o.typeAnnotation.type](o.typeAnnotation)}`;
	// 	}

	// 	return identifier;
	// }).join(', ')})`
	// console.log(caller());
	return ['unknown', undefined, 'TSCallSignatureDeclaration'];
};