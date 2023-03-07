const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").YieldExpression} ast 
 */
module.exports = ast => {
	return `yield${ast.delegate ? '*' : ''}${ast.argument ? ' ' + packages[ast.argument.type]((ast.argument.parent = ast) && ast.argument) : ''}`;
};