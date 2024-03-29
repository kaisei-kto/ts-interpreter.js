const { packages } = require('../index');

/**
 *
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSTypeParameterInstantiation} ast
 */
module.exports = (ast) => {
	return ast.params.map((o) => packages[o.type]((o.parent = ast) && o)).join(', ');
};
