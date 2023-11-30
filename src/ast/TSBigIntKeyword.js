const { packages } = require('../index');

/**
 * 
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').TSBigIntKeyword} ast
 */
module.exports = ast => {
	return 'bigint';
};
