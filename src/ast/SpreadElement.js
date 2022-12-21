const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").SpreadElement} ast 
 */
module.exports = ast => {
	return `...${packages[ast.argument.type](ast.argument)}`
}