const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ImportDeclaration} object 
 */
module.exports = object => {
	// let nspecifier = !!object.specifiers.find(s => s.type === 'ImportSpecifier');
	// let nname = object.specifiers.map((specifier, index) => {
	// console.log(specifier.type);
	// return nspecifier ? `${specifier.local.name !== specifier.imported.name ? specifier.imported.name + ': ' : ''}${specifier.local.name}` : specifier.local.name;
	// return packages[specifier.type]()
	// });

	// return nname.length > 0 ? `const ${nspecifier ? '{ ' : ''}${nname.join(', ')}${nspecifier ? ' }' : ''} = require(${packages[object.source.type](object.source)})` : `require(${packages[object.source.type](object.source)})`;
	const nspecifiers = object.specifiers.filter(s => s.type === 'ImportSpecifier');
	const dspecifiers = object.specifiers.filter(s => s.type === 'ImportDefaultSpecifier');
	const imports = []

	if (nspecifiers.length > 0) {
		imports.push(`const { ${nspecifiers.map(ast => packages[ast.type]((ast.parent = object) && ast)).join(', ')} } = ${`require(${packages[object.source.type](object.source)})`}`)
	}

	if (dspecifiers.length > 0) {
		imports.push(dspecifiers.map(ast => {
			return `const ${packages[ast.type]((ast.parent = object) && ast)} = require(${packages[object.source.type](object.source)})`
		}).join('\n'))
	}

	if (imports.length === 0) {
		imports.push(`require(${packages[object.source.type]((object.source.parent = object) && object.source)})`)
	}

	// console.log(imports);

	return imports.join('\n');
}