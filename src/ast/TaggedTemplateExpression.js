const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TaggedTemplateExpression} ast 
 */
module.exports = ast => {
	return `${packages[ast.tag.type]((ast.tag.parent = ast) && ast.tag)}${packages[ast.quasi.type]((ast.quasi.parent = ast) && ast.quasi)}`;
};