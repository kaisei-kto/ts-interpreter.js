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
			if (['FunctionDeclaration', 'ArrowFunctionExpression'].indexOf(ast.declaration.type) !== -1) {
				const f = packages[ast.declaration.type](ast.declaration);
				const n = f.substring(f.indexOf('function') + 9, f.indexOf('('));
				return `${f};module.exports.${n} = ${n};`
			} else {
				ast.declaration.parent = ast.declaration.type === 'VariableDeclaration' ? undefined : ast;
				if (!ast.declaration.parent) {
					const f = packages[ast.declaration.type](ast.declaration);
					const n = f.substring(ast.declaration.kind.length + 1, f.indexOf(' ='));
					return `${f};module.exports.${n} = ${n};`
				}

				return `module.exports.${packages[ast.declaration.type](ast.declaration)}`;
			}
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