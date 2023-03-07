const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").IfStatement} ast 
 */
module.exports = ast => {
	return `if (${packages[ast.test.type]((ast.test.parent = ast) && ast.test)}) ${packages[ast.consequent.type](ast.consequent)}${ast.alternate ? ' else ' + packages[ast.alternate.type](ast.alternate) : ''}`;
};