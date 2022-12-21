const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").VariableDeclaration} ast 
 */
module.exports = (ast) => {
	return ast.type !== 'VariableDeclaration' ? packages[ast.type](ast) : `${!ast.parent ? ast.kind + ' ' : ''}${ast.declarations.map(o => packages[o.type]((o.parent = ast) && o)).join(', ')}`
}