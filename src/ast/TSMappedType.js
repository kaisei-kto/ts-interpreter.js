const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSMappedType} ast 
 */
module.exports = ast => {
	let mtype = packages[ast.typeParameter.type]((ast.typeParameter.parent = ast) && ast.typeParameter)
	
	return `{ [${mtype}]${ast.optional ? '?' : ''}: ${packages[ast.typeAnnotation.type]((ast.typeAnnotation.parent = ast) && ast.typeAnnotation)} }`;
}