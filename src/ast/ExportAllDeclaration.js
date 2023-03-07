const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ExportAllDeclaration} ast 
 */
module.exports = ast => {
	return `Object.assign(module.exports, module.exports, require(${packages[ast.source.type](ast.source)}))`;
};