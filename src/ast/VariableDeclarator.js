const { packages } = require('../index');
const { js_docs } = require('../utils');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").VariableDeclarator} ast 
 */
module.exports = ast => {
	const identifier = packages[ast.id.type]((ast.id.parent = ast) && ast.id);
	let value = ast.init ? packages[ast.init.type]((ast.init.parent = ast) && ast.init) : undefined;
	let typings;

	if (Array.isArray(value)) {
		if (typeof value[0] === 'string' && value[0].startsWith('/**')) {
			typings = value.shift();
		}
		value = value.pop();
	}

	if (ast.init !== null && typeof ast.init === 'object' && ast.init.typeArguments && ast.init.callee) {
		const callee = packages[ast.init.callee.type](ast.init.callee);
		const args = packages[ast.init.typeArguments.type]((ast.init.typeArguments.parent = ast.init) && ast.init.typeArguments);

		typings = js_docs([
			[ 'type', `${callee}<${args}>` ]
		]);
	}

	return {
		identifier,
		typings,
		declaration: `${identifier}${ast.init ? ` = ${value}` : ''}${!ast.parent ? ';' : ''}`
	};
};