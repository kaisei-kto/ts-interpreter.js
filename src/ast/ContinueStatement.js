const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ContinueStatement} ast 
 */
module.exports = ast => {
	let identifier = '';

	if (ast.label) {
		identifier = packages[ast.label.type](ast.label);
	}

	return `continue ${identifier}`;
};