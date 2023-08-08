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
				return `${h !== '' ? h + '\n' : ''}${f};module.exports.${n} = ${n};`;
			} else {
				ast.declaration.parent = ast.declaration.type === 'VariableDeclaration' ? undefined : ast;
				if (!ast.declaration.parent) {
					const value = packages[ast.declaration.type](ast.declaration);
					let f;

					if (Array.isArray(value)) {
						f = value.pop();
						// console.log(`assign here -> ${f} (${f?.length})`);
					} else {
						f = value;
						// console.log(`assign here 2 -> ${f} (${f?.length})`);
					}

					while (Array.isArray(f)) {
						f = f.pop();
					}
					
					let last_index = f.indexOf(' =');
					if (last_index === -1) last_index = undefined;

					const n = f.substring((f.indexOf(ast.declaration.kind + ' ')) + ast.declaration.kind.length + 1, last_index);
					return `${f};module.exports.${n} = ${n};`;
				}

				const value = packages[ast.declaration.type](ast.declaration);
				let n;
				if (value?.indexOf('const ') === 0 || value?.indexOf('var ') === 0 || value?.indexOf('let ') === 0) {
					n = value.split(' ')[1];
				}

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