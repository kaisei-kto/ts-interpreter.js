const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").AwaitExpression} ast 
 */
module.exports = ast => {
	// console.log(ast)
	return `${!ast.parent ? ';' : ''}(await ${packages[ast.argument.type]((ast.argument.parent = ast) && ast.argument)})`;
};