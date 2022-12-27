const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").LabeledStatement} ast 
 */
module.exports = ast => {
	return `${packages[ast.label.type]((ast.label.parent = ast) && ast.label)}: ${packages[ast.body.type](ast.body)}`;
}