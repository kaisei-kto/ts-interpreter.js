const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ImportDefaultSpecifier} specifier 
 */
module.exports = specifier => {
	// return `${specifier.local.name !== specifier.imported.name ? specifier.imported.name + ': ' : ''}${specifier.local.name}`;
	return specifier.local.name;
}