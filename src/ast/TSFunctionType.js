const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSFunctionType} ast 
 */
module.exports = ast => {
	return `(${ast.params.map(o => packages[o.type]((o.parent = ast) && o))}) => ${ast.returnType ? packages[ast.returnType.type]((ast.returnType.parent = ast) && ast.returnType) : 'undefined'}`;
}