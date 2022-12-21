const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSIndexSignature} ast 
 */
module.exports = ast => {
	return ast.parameters.map(o => packages[o.type](o));
}