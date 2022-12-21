const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").DebuggerStatement} ast 
 */
module.exports = ast => {
	return 'debugger;';
}