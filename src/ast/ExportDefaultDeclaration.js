const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ExportDefaultDeclaration} ast 
 */
module.exports = ast => {
	return `module.exports = ${packages[ast.declaration.type](ast.declaration)}`;
	// return `Object.assign(module.exports, ${require(`./${ast.declaration.type}`)(ast.declaration)})`
};