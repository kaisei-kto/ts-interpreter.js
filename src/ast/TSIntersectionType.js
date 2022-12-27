const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSIntersectionType} ast 
 */
module.exports = ast => {
	return ast.types.map(o => packages[o.type]((o.parent = ast) && o)).join(' & ');
}