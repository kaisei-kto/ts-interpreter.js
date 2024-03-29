const { packages } = require('../index');

/**
 *
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").MemberExpression} ast
 */
module.exports = (ast) => {
	let property = packages[ast.property.type]((ast.property.parent = ast) && ast.property);

	if (ast.computed) property = `[${property}]`;
	property = `${ast.optional ? '?' : ''}${ast.computed && !ast.optional ? '' : '.'}${property}`;

	return `${packages[ast.object.type]((ast.object.parent = ast) && ast.object)}${property}`;
};
