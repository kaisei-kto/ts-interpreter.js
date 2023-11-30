const { packages } = require('../index');

/**
 *
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").MetaProperty} ast
 */
module.exports = (ast) => {
	return `${packages[ast.meta.type](ast.meta)}.${packages[ast.property.type](ast.property)}`;
};
