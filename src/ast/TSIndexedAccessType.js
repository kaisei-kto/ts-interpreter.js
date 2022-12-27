const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSIndexedAccessType} ast 
 */
module.exports = ast => {
	return `${packages[ast.objectType.type]((ast.objectType.parent = ast) && ast.objectType)}[${packages[ast.indexType.type]((ast.indexType.parent = ast) && ast.indexType)}]`;
}