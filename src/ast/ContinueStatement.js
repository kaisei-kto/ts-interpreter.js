const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ContinueStatement} ast 
 */
module.exports = ast => {
	return 'continue';
};