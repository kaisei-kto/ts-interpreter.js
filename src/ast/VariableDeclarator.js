const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").VariableDeclarator} ast 
 */
module.exports = ast => {
	const value = ast.init ? packages[ast.init.type]((ast.init.parent = ast) && ast.init) : undefined;
	if (Array.isArray(value)) {
		return [ value[0], `${packages[ast.id.type]((ast.id.parent = ast) && ast.id)}${ast.init ? ` = ${value[1]}` : ''}` ];
	}

	return `${packages[ast.id.type]((ast.id.parent = ast) && ast.id)}${ast.init ? ` = ${value}` : ''}${!ast.parent ? ';' : ''}`;
}