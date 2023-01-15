const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ImportSpecifier} specifier 
 */
module.exports = specifier => {
	return `${specifier.local.name !== specifier.imported.name ? specifier.imported.name + ': ' : ''}${specifier.local.name}`;
}