const { packages } = require('../index');

const { js_docs } = require("../utils");

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ExportNamedDeclaration} ast 
 */
module.exports = ast => {
	if (ast.declaration) {
		if ((['TSInterfaceDeclaration', 'TSTypeAliasDeclaration'].indexOf(ast.declaration.type) + 1)) {
			const body = packages[ast.declaration.type](ast.declaration);

			body.unshift([ 'exports' ]);

			return js_docs(body);
		} else {
			ast.declaration.parent = ast;

			return `module.exports.${packages[ast.declaration.type](ast.declaration)}`
		}
	} else if (ast.specifiers.length > 0) {
		const specifiers = [];

		for (const specifier of ast.specifiers) {
			const key = packages[specifier.exported.type](specifier.exported);
			const value = packages[specifier.local.type](specifier.local);

			specifiers.push(key !== value ? `${key}: ${value}` : key);
		}

		return `module.exports = {${specifiers.join(',')}}`
	}
}