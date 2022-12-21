const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").BreakStatement} ast 
 */
module.exports = ast => {
	return 'break;';
}