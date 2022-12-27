const { packages } = require('../index');
const { js_docs } = require('../utils');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").PropertyDefinition} ast 
 */
module.exports = ast => {
	const typings = []
	if (ast.typeAnnotation) {
		typings.push([ 'type', packages[ast.typeAnnotation.type](ast.typeAnnotation) ]);
	}

	return `${typings.length > 0 ? js_docs(typings) + '\n' : ''}${ast.static ? 'static ' : ''}${ast.accessibility === 'private' ? '#' : ''}${packages[ast.key.type]((ast.key.parent = ast) && ast.key)}${ast.value ? `= ${packages[ast.value.type]((ast.value.parent = ast) && ast.value)}` : ''}`;
}