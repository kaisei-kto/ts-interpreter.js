const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSTypeParameter} ast 
 */
module.exports = ast => {
	return packages[ast.name.type](ast.name)
}