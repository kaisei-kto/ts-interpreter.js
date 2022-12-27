const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").WithStatement} ast 
 */
module.exports = ast => {
	return `with (${packages[ast.object.type]((ast.object = ast) && ast.object)}) ${packages[ast.body.type](ast.body)}`;
}