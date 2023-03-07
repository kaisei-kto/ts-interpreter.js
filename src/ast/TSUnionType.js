const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSUnionType} ast 
 */
module.exports = ast => {
	return ast.types.map(o => packages['TSTypeAnnotation']((o.parent = ast) && o)).join('|');
};