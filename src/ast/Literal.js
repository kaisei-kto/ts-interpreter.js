const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").Literal} ast 
 */
module.exports = ast => {
	if (typeof ast?.value === 'number') {
		return ast.value;
	}

	return 'raw' in ast ? ast.raw : JSON.stringify(ast.value);
}