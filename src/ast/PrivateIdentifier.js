const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").PrivateIdentifier} ast 
 */
module.exports = ast => {
	// return `#${ast.name}`;
	return `${ast.name}`;
};