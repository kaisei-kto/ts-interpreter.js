const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ConditionalExpression} ast 
 */
module.exports = ast => {
	return `${packages[ast.test.type]((ast.test.parent = ast) && ast.test)} ? ${packages[ast.consequent.type]((ast.consequent.parent = ast) && ast.consequent)} : ${packages[ast.alternate.type]((ast.alternate.parent = ast) && ast.alternate)}`;
};