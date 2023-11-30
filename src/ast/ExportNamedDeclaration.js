const { packages } = require('../index');

const { js_docs } = require('../utils');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ExportNamedDeclaration} ast 
 */
module.exports = ast => {
	if (ast.declaration) {
		if ((['TSInterfaceDeclaration', 'TSTypeAliasDeclaration'].indexOf(ast.declaration.type) + 1)) {
			const body = packages[ast.declaration.type]((ast.declaration.parent = ast) && ast.declaration);
			
			body.unshift(['exports']);
			
			return js_docs(body);
		} else {
			if (['FunctionDeclaration', 'ArrowFunctionExpression'].indexOf(ast.declaration.type) !== -1) {
				let [h, f] = packages[ast.declaration.type]((ast.declaration.parent = ast) && ast.declaration);
				// console.log(h,f);
				let n = f.substring(f.indexOf('function'), f.indexOf('('));
				if (n === 'function') {
					// console.log(f);
					// const tag = 
					// n = f.substring(0, Math.max(f.indexOf(' = function'), 0) || f.indexOf('= async function'));
					const func = f.split('\n');

					// func[0] = `function ${n}${func[0].split(' = function')[1]}`;

					// f = func.join('\n');

					n = func[0].split(' = ').shift();
					let l = func[0].substr(n.length + 3);

					let header = l.substr(0, l.indexOf('('));
					let params = l.substr(header.length);
					func[0] = `${header} ${n}${params}`;
					f = func.join('\n');
				}
				if (n.startsWith('/**')) return;
				return `${h !== '' ? h + '\n' : ''}${f};module.exports.${n} = ${n};`;
			} else {
				ast.declaration.parent = ['VariableDeclaration' ,'ClassDeclaration'].indexOf(ast.declaration.type) + 1 ? undefined : ast;
				const value = packages[ast.declaration.type](ast.declaration);
				const { identifier, declaration } = value;
				if (!ast.declaration.parent) {
					const n = identifier;
					return `${declaration};module.exports.${n} = ${n};`;
				}

				let n;
				if (value?.indexOf('const ') === 0 || value?.indexOf('var ') === 0 || value?.indexOf('let ') === 0) {
					n = value.split(' ')[1];
				}

				if (typeof n === 'string' ? n.startsWith('/**') : value.startsWith('/**')) return;
				return n ? `${value}\nmodule.exports.${n} = ${n}` : `module.exports.${value}`;
			}
		}
	} else if (ast.specifiers.length > 0) {
		const specifiers = [];

		for (const specifier of ast.specifiers) {
			const key = packages[specifier.exported.type]((specifier.exported.parent = specifier) && specifier.exported);
			const value = packages[specifier.local.type]((specifier.local.parent = specifier) && specifier.local);

			specifiers.push(key !== value ? `${key}: ${value}` : key);
		}

		return `module.exports = {${specifiers.join(',')}}`;
	}
};