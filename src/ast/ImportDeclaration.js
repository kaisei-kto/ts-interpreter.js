const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ImportDeclaration} object 
 */
module.exports = object => {
	let nspecifier = !!object.specifiers.find(s => s.type === 'ImportSpecifier');
	let nname = object.specifiers.map((specifier, index) => {
		return nspecifier ? `${specifier.local.name !== specifier.imported.name ? specifier.imported.name + ': ' : ''}${specifier.local.name}` : specifier.local.name;
	});

	return nname.length > 0 ? `const ${nspecifier ? '{ ' : ''}${nname.join(', ')}${nspecifier ? ' }' : ''} = require(${packages[object.source.type](object.source)})` : `require(${packages[object.source.type](object.source)})`;
}