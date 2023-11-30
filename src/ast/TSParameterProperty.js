const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSParameterProperty} ast 
 */
module.exports = ast => {
	return ast.parameter.name;
};