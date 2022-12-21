const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").AwaitExpression} ast 
 */
module.exports = ast => {
	return `await ${packages[ast.argument.type](ast.argument)}`;
}